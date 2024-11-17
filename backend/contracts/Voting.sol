// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Voting Contract
 * @author Cyril / Ben - Alyra
 * @notice Implements a voting system with multiple stages of workflow, where the owner manages the phases.
 * @dev The contract uses enums to represent workflow stages and mappings to manage voter registrations and votes.
 */
contract Voting is Ownable {
    /// @notice Stores the ID of the winning proposal after votes are tallied
    uint public winningProposalID;

    /**
     * @notice Represents a voter in the voting system
     * @dev Tracks registration, voting status, and the proposal voted for
     */
    struct Voter {
        bool isRegistered; /// @notice Indicates whether the voter is registered
        bool hasVoted; /// @notice Indicates whether the voter has already voted
        uint votedProposalId; /// @notice The ID of the proposal the voter has voted for
    }

    /**
     * @notice Represents a proposal in the voting system
     * @dev Includes a description and a count of votes received
     */
    struct Proposal {
        string description; /// @notice A brief description of the proposal
        uint voteCount; /// @notice The total number of votes the proposal has received
    }

    /**
     * @notice Enum representing the various stages of the voting process
     * @dev Used to control the workflow of the voting contract
     */
    enum WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    /**
     * @notice Tracks the current stage of the voting process
     * @dev Enum value changes as the owner progresses through the workflow phases
     */
    WorkflowStatus public workflowStatus;

    /**
     * @notice Array containing all proposals submitted during the proposal registration phase
     * @dev Each element in the array is a `Proposal` struct with a description and vote count
     */
    Proposal[] proposalsArray;

    /**
     * @notice Mapping to track voter information by their address
     * @dev Maps an address to a `Voter` struct, which stores registration status, voting status, and the proposal voted for
     */
    mapping(address => Voter) voters;

    /// @notice Emitted when a voter is registered
    /// @param voterAddress The address of the registered voter
    event VoterRegistered(address voterAddress);

    /// @notice Emitted when the workflow status changes
    /// @param previousStatus The previous workflow status
    /// @param newStatus The new workflow status
    event WorkflowStatusChange(
        WorkflowStatus previousStatus,
        WorkflowStatus newStatus
    );

    /// @notice Emitted when a proposal is registered
    /// @param proposalId The ID of the newly registered proposal
    event ProposalRegistered(uint proposalId);

    /// @notice Emitted when a voter casts a vote
    /// @param voter The address of the voter
    /// @param proposalId The ID of the proposal that was voted for
    event Voted(address voter, uint proposalId);

    /// @notice Maximum number of proposals that can be registered
    uint public constant MAX_PROPOSALS = 100;

    /**
     * @dev Sets the contract deployer as the owner
     */
    constructor() Ownable(msg.sender) {}

    modifier onlyVoters() {
        require(voters[msg.sender].isRegistered, "You're not a voter");
        _;
    }

    // on peut faire un modifier pour les états

    // ::::::::::::: GETTERS ::::::::::::: //

    /**
     * @notice Retrieves the details of a voter
     * @dev Only registered voters can call this function
     * @param _addr The address of the voter
     * @return Voter struct containing voter details
     */
    function getVoter(
        address _addr
    ) external view onlyVoters returns (Voter memory) {
        return voters[_addr];
    }

    /**
     * @notice Retrieves the details of a proposal
     * @dev Only registered voters can call this function
     * @param _id The ID of the proposal
     * @return Proposal struct containing proposal details
     */
    function getOneProposal(
        uint _id
    ) external view onlyVoters returns (Proposal memory) {
        return proposalsArray[_id];
    }

    // ::::::::::::: REGISTRATION ::::::::::::: //

    /**
     * @notice Adds a voter to the registry
     * @dev Can only be called by the owner and during the voter registration phase
     * @param _addr The address of the voter to register
     */
    function addVoter(address _addr) external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.RegisteringVoters,
            "Voters registration is not open yet"
        );
        require(voters[_addr].isRegistered != true, "Already registered");

        voters[_addr].isRegistered = true;
        emit VoterRegistered(_addr);
    }

    // ::::::::::::: PROPOSAL ::::::::::::: //

    /**
     * @notice Adds a proposal
     * @dev Can only be called by registered voters and during the proposal registration phase. the number of proposals must not exceed the maximum allowed.
     * @param _desc The description of the proposal must not be empty
     */
    function addProposal(string calldata _desc) external onlyVoters {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationStarted,
            "Proposals are not allowed yet"
        );
        require(
            proposalsArray.length < MAX_PROPOSALS,
            "Maximum number of proposals reached"
        );
        require(
            keccak256(abi.encode(_desc)) != keccak256(abi.encode("")),
            "Vous ne pouvez pas ne rien proposer"
        ); // facultatif
        // voir que desc est different des autres

        Proposal memory proposal;
        proposal.description = _desc;
        proposalsArray.push(proposal);
        // proposalsArray.push(Proposal(_desc,0));
        emit ProposalRegistered(proposalsArray.length - 1);
    }

    // ::::::::::::: VOTE ::::::::::::: //

    /**
     * @notice Casts a vote for a proposal
     * @dev Can only be called by registered voters and during the voting session
     * @param _id The ID of the proposal to vote for
     */
    function setVote(uint _id) external onlyVoters {
        require(
            workflowStatus == WorkflowStatus.VotingSessionStarted,
            "Voting session havent started yet"
        );
        require(voters[msg.sender].hasVoted != true, "You have already voted");
        require(_id < proposalsArray.length, "Proposal not found"); // pas obligé, et pas besoin du >0 car uint

        voters[msg.sender].votedProposalId = _id;
        voters[msg.sender].hasVoted = true;
        proposalsArray[_id].voteCount++;

        emit Voted(msg.sender, _id);
    }

    // ::::::::::::: STATE ::::::::::::: //

    /**
     * @notice Starts the proposal registration phase
     * @dev Can only be called by the owner and during the voter registration phase
     */
    function startProposalsRegistering() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.RegisteringVoters,
            "Registering proposals cant be started now"
        );
        workflowStatus = WorkflowStatus.ProposalsRegistrationStarted;

        Proposal memory proposal;
        proposal.description = "GENESIS";
        proposalsArray.push(proposal);

        emit WorkflowStatusChange(
            WorkflowStatus.RegisteringVoters,
            WorkflowStatus.ProposalsRegistrationStarted
        );
    }

    /**
     * @notice Ends the proposal registration phase
     * @dev Can only be called by the owner and during the proposal registration phase
     */
    function endProposalsRegistering() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationStarted,
            "Registering proposals havent started yet"
        );
        workflowStatus = WorkflowStatus.ProposalsRegistrationEnded;
        emit WorkflowStatusChange(
            WorkflowStatus.ProposalsRegistrationStarted,
            WorkflowStatus.ProposalsRegistrationEnded
        );
    }

    /**
     * @notice Starts the voting session
     * @dev Can only be called by the owner and after the proposal registration phase ends
     */
    function startVotingSession() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationEnded,
            "Registering proposals phase is not finished"
        );
        workflowStatus = WorkflowStatus.VotingSessionStarted;
        emit WorkflowStatusChange(
            WorkflowStatus.ProposalsRegistrationEnded,
            WorkflowStatus.VotingSessionStarted
        );
    }

    /**
     * @notice Ends the voting session
     * @dev Can only be called by the owner and during the voting session
     */
    function endVotingSession() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.VotingSessionStarted,
            "Voting session havent started yet"
        );
        workflowStatus = WorkflowStatus.VotingSessionEnded;
        emit WorkflowStatusChange(
            WorkflowStatus.VotingSessionStarted,
            WorkflowStatus.VotingSessionEnded
        );
    }

    /**
     * @notice Tallies the votes and determines the winning proposal
     * @dev Can only be called by the owner and after the voting session ends
     */
    function tallyVotes() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.VotingSessionEnded,
            "Current status is not voting session ended"
        );
        uint _winningProposalId;
        for (uint256 p = 0; p < proposalsArray.length; p++) {
            if (
                proposalsArray[p].voteCount >
                proposalsArray[_winningProposalId].voteCount
            ) {
                _winningProposalId = p;
            }
        }
        winningProposalID = _winningProposalId;

        workflowStatus = WorkflowStatus.VotesTallied;
        emit WorkflowStatusChange(
            WorkflowStatus.VotingSessionEnded,
            WorkflowStatus.VotesTallied
        );
    }
}
