import AuthService from './auth'
import FeedbackService from './feedback'
import FoodAndDrinksService from './foodAndDrinks'
import GuidePracticeService from './guidePractice'
import GuidePracticeTypeService from './guidePracticeType'
import GymAndSpaService from './gymAndSpa'
import MantraService from './mantra'
import MantraSelfCareService from './mantraSelfCare'
import QuizService from './quiz'
import UserService from './user'
import UserProblemService from './userProblem'
import ApiClient from './ApiClient'

export class ApiService {
  constructor() {
    this.auth = new AuthService(ApiClient)
    this.feedback = new FeedbackService(ApiClient)
    this.foodAndDrinks = new FoodAndDrinksService(ApiClient)
    this.guidePractice = new GuidePracticeService(ApiClient)
    this.guidePracticeType = new GuidePracticeTypeService(ApiClient)
    this.gymAndSpa = new GymAndSpaService(ApiClient)
    this.mantra = new MantraService(ApiClient)
    this.mantraSelfCare = new MantraSelfCareService(ApiClient)
    this.quiz = new QuizService(ApiClient)
    this.user = new UserService(ApiClient)
    this.userProblem = new UserProblemService(ApiClient)
  }
}

const api = new ApiService()

export default api
