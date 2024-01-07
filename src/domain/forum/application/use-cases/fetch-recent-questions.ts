import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface FetchRecentQuestionsUseCaseCaseRequest {
    page: number
}

interface FetchRecentQuestionsUseCaseCaseResponse {
    questions: Question[]
}

export class FetchRecentQuestionsUseCaseCase {
    constructor(
        private questionsRepository: QuestionsRepository,
    ) { }

    async execute({ page
    }: FetchRecentQuestionsUseCaseCaseRequest): Promise<FetchRecentQuestionsUseCaseCaseResponse> {
        const questions = await this.questionsRepository.findManyRecent({ page })

        return {
            questions
        }
    }
}