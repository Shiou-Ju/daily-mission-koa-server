import Router from 'koa-router';
import {
  getMissionController,
  updateMissionController,
  getAllMissionsController,
  createMissionController,
} from '../controllers/missionsController';

const router = new Router();

router.get('/missions', getAllMissionsController);
router.get('/missions/:id', getMissionController);

router.post('/missions', createMissionController);
// TODO:
router.put('/missions/:id', updateMissionController);
// TODO:
// router.delete()

export { router };
