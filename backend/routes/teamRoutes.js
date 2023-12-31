const express = require('express');
const {
  searchTeams,
  getTeam,
  getMyTeams,
  getPeopleTeams,
  createTeam,
  deleteTeam,
  createRequest,
  viewRequest,
  acceptMember,
  rejectMember,
} = require('../controllers/teamController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// GET all teams
router.get('/', searchTeams);

// GET a single team
router.get('/teamDetail/:id', getTeam);

// GET owned team
router.get('/teamList/:id', getPeopleTeams);

// require auth for team routes
router.use(requireAuth);

// GET owned team
router.get('/myTeams', getMyTeams);

// POST a new team
router.post('/', createTeam);

// DELETE a team
router.delete('/:id', deleteTeam);

// create request teamRequest
router.patch('/request/:id', createRequest);

// View request for created team
router.get('/request', viewRequest);

// Accept teamMember
router.patch('/accept/:id', acceptMember);

// Reject teamMember
router.patch('/reject/:id', rejectMember);

module.exports = router;
