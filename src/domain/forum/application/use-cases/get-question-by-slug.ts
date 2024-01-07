import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface GetQuestionBySlugUseCaseCaseRequest {
    slug: string
}

interface GetQuestionBySlugUseCaseCaseResponse {
    question: Question
}

export class GetQuestionBySlugUseCaseCase {
    constructor(
        private questionsRepository: QuestionsRepository,
    ) { }

    async execute({ slug
    }: GetQuestionBySlugUseCaseCaseRequest): Promise<GetQuestionBySlugUseCaseCaseResponse> {
        const question = await this.questionsRepository.findBySlug(slug)

        if (!question) {
            throw new Error('Question not found.')
        }

        await this.questionsRepository.create(question)

        return {
            question
        }
    }
}