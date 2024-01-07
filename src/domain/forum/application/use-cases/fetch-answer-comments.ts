import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface FetchAnswerCommentsUseCaseCaseRequest {
    answerId: string
    page: number
}

interface FetchAnswerCommentsUseCaseCaseResponse {
    answerComments: AnswerComment[]
}

export class FetchAnswerCommentsUseCaseCase {
    constructor(
        private answerCommentsRespository: AnswerCommentsRepository,
    ) { }

    async execute({ page, answerId
    }: FetchAnswerCommentsUseCaseCaseRequest): Promise<FetchAnswerCommentsUseCaseCaseResponse> {
        const answerComments = await this.answerCommentsRespository.findManyByAnswerId(answerId, { page })

        return {
            answerComments
        }
    }
}