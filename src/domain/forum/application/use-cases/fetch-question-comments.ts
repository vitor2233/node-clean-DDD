import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface FetchQuestionCommentsUseCaseCaseRequest {
    questionId: string
    page: number
}

interface FetchQuestionCommentsUseCaseCaseResponse {
    questionComments: QuestionComment[]
}

export class FetchQuestionCommentsUseCaseCase {
    constructor(
        private questionCommentsRespository: QuestionCommentsRepository,
    ) { }

    async execute({ page, questionId
    }: FetchQuestionCommentsUseCaseCaseRequest): Promise<FetchQuestionCommentsUseCaseCaseResponse> {
        const questionComments = await this.questionCommentsRespository.findManyByQuestionId(questionId, { page })

        return {
            questionComments
        }
    }
}