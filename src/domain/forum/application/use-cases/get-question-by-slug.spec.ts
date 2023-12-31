import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCaseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCaseCase

describe('Get Question By Slug', () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new GetQuestionBySlugUseCaseCase(inMemoryQuestionsRepository)
    })

    it('should be able to get question by slug', async () => {
        const newQuestion = makeQuestion({
            slug: Slug.create('example-question')
        })
        await inMemoryQuestionsRepository.create(newQuestion)

        const result = await sut.execute({
            slug: 'example-question'
        })

        expect(result.value?.question.id).toBeTruthy()

        expect(result.value?.question.title).toEqual(newQuestion.title)
    })
})

