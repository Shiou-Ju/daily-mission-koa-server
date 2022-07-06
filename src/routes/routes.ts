import Router from 'koa-router';
import {
  getMissionController,
  updateMissionController,
  getAllMissionsController,
  createMissionController,
  deleteMissionController,
  searchMissionController,
} from '../controllers/missionsController';

const router = new Router();

// missions routes
router.get('/missions', getAllMissionsController);
router.get('/missions/', searchMissionController);
router.post('/missions', createMissionController);

// paramerterized mission routes
router.get('/missions/:id', getMissionController);
router.put('/missions/:id', updateMissionController);
router.delete('/missions/:id', deleteMissionController);

export { router };
