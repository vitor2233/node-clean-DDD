import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { FetchQuestionAnswersUseCaseCase } from './fetch-question-answers'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { FetchQuestionCommentsUseCaseCase } from './fetch-question-comments'
import { makeQuestionComment } from 'test/factories/make-question-comment'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentsUseCaseCase

describe('Fetch Question Comments', () => {
    beforeEach(() => {
        inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
        sut = new FetchQuestionCommentsUseCaseCase(inMemoryQuestionCommentsRepository)
    })

    it('should be able to fetch question comments', async () => {
        await inMemoryQuestionCommentsRepository.create(makeQuestionComment({ questionId: new UniqueEntityID('question-1') }))
        await inMemoryQuestionCommentsRepository.create(makeQuestionComment({ questionId: new UniqueEntityID('question-1') }))
        await inMemoryQuestionCommentsRepository.create(makeQuestionComment({ questionId: new UniqueEntityID('question-1') }))

        const { questionComments } = await sut.execute({ questionId: 'question-1', page: 1 })

        expect(questionComments).toHaveLength(3)
    })

    it('should be able to fetch paginated question comments', async () => {
        for (let i = 1; i <= 22; i++) {
            await inMemoryQuestionCommentsRepository.create(makeQuestionComment({ questionId: new UniqueEntityID('question-1') }))
        }

        const { questionComments } = await sut.execute({ questionId: 'question-1', page: 2 })

        expect(questionComments).toHaveLength(2)
    })
})

