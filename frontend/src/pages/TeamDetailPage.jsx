import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTeamById, deleteTeam, requestToJoin } from '../utils/fetch';
import { formatDate } from '../utils/date';
import defaultLogo from '../assets/Team UP Logo.svg';
import PositionCardDetail from '../components/PositionCardDetail';
import ConfirmDelete from '../components/ConfirmDeletionBox';
import Cover from '../components/Cover';
import Loading from '../components/Loading';

function TeamDetailPage({ userID }) {
  const { id } = useParams();
  const [team, setTeam] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [idle, setIdle] = React.useState({ status: 'waiting' });

  const navigate = useNavigate();

  function chengeDeleting(id) {
    setIdle({ status: 'deleting' });
  }

  async function onDeleteTeam(id) {
    const response = await deleteTeam(id);
    if (!response.error) {
      alert('Delete success');
      navigate('/myteam');
    } else {
      alert(response.data);
    }
  }

  React.useEffect(() => {
    getTeamById(id)
      .then((response) => {
        setTeam(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [id]);

  function onJoinClick(id) {
    requestToJoin(id);
    window.alert('Request to join sent!');
  }

  if (loading) {
    return (
      <div className="pt-[200px]">
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="relative bg-white flex flex-row-reverse justify-center w-full px-[30px] gap-5 max-[760px]:flex-col z-0" style={{ overflowX: 'hidden' }}>
        {idle.status === 'deleting' ? (
          <div>
            <Cover />
            <ConfirmDelete onConfirm={() => onDeleteTeam(id)} onCancel={() => setIdle({ status: 'waiting' })} />
          </div>
        ) : null}
        <svg height="256" viewBox="0 0 1920 256" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute z-[-1] top-0 w-full">
          <path
            d="M0 0V205.024C0 205.024 344.437 319.72 960 205.024C1575.56 90.3293 1920 205.024 1920 205.024V7.53698e-05L0 0Z"
            fill="url(#paint0_linear_283_1413)"
          />
          <defs>
            <linearGradient id="paint0_linear_283_1413" x1="960" y1="0" x2="960" y2="449.688" gradientUnits="userSpaceOnUse">
              <stop stop-color="#5AC7FA" />
              <stop offset="0.602559" stop-color="#2483F0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Team Information */}
        <div className="flex flex-col items-center mt-8">
          {/* Profile Picture */}
          <div className="bg-white rounded-full w-32 h-32 mt-[120px] flex items-center justify-center">
            <img src={team.teamLogo || defaultLogo} alt="Profile" className="rounded-full w-full h-full object-cover border-2 border-white" />
          </div>

          {/* Team Name */}
          <h1 className="text-3xl font-bold my-4">{team.teamName}</h1>

          {/* Competition Name */}
          <h2 className="text-xl font-semibold mb-4">{team.teamCompetition}</h2>

          {/* Team Details */}
          <p className="text-gray-600 mb-6 max-w-[1000px] text-center">
            {/* Isi dengan detail team (Lorem Ipsum) */}
            {team.teamDescription}
          </p>

          {/* Rounded Boxes */}
          <div className="flex justify-between mb-8 gap-4">
            <div className="rounded-xl p-4 shadow-md w-[220px] bg-blue-500">
              <h3 className="text-sm font-semibold text-white text-center">Location</h3>
              <p className="text-xs text-white text-center">
                {team.teamLocation.city}, {team.teamLocation.province}
              </p>
            </div>
            <div className="rounded-xl p-4 shadow-md w-[220px] bg-blue-500">
              <h3 className="text-sm font-semibold text-white text-center">Start Date</h3>
              <p className="text-xs text-white text-center">{formatDate(team.teamStart)}</p>
            </div>
            <div className="rounded-xl p-4 shadow-md w-[220px] bg-blue-500">
              <h3 className="text-sm font-semibold text-white text-center">End Date</h3>
              <p className="text-xs text-white text-center">{formatDate(team.teamEnd)}</p>
            </div>
            <div className="rounded-xl p-4 shadow-md w-[220px] bg-blue-500">
              <h3 className="text-sm font-semibold text-white text-center">Leader Name</h3>
              <p className="text-xs text-white text-center">{team.teamLeader}</p>
            </div>
          </div>
          {/* Member Section */}
          <h2 className="text-2xl font-bold mb-4">Members</h2>
          {/* <MemberList /> */}
          <div className="flex flex-col w-full">
            {team.teamMember.map((member) => (
              <PositionCardDetail
                key={member._id}
                id={member._id}
                positionName={member.position}
                detail={member.description}
                empty={member.member ? false : true}
                onJoinClick={onJoinClick}
              />
            ))}
            {/* Add more cards as needed */}
          </div>
          {userID === team.teamLeaderID ? (
            <button
              onClick={chengeDeleting}
              className="rounded-xl w-44 h-10 p-0 mb-5 text-white text-normal text-lg bg-gradient-to-l from-red-500 to-red-600 transition ease-in-out duration-150 hover:scale-105 active:scale-100"
            >
              <p className="text-sm">Delete Team</p>
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}

export default TeamDetailPage;
