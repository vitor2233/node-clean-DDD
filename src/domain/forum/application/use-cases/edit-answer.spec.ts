import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { EditAnswerUseCase } from './edit-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        sut = new EditAnswerUseCase(inMemoryAnswersRepository)
    })

    it('should be able to edit answer', async () => {
        const newAnswer = makeAnswer({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('answer-1'))
        await inMemoryAnswersRepository.create(newAnswer)

        await sut.execute({
            authorId: 'author-1',
            answerId: newAnswer.id.toString(),
            content: 'Should this be'
        })

        expect(inMemoryAnswersRepository.items[0]).toMatchObject({
            content: 'Should this be'
        })
    })

    it('should not be able to edit answer from another user', async () => {
        const newAnswer = makeAnswer(
            {
                authorId: new UniqueEntityID('author-1')
            },
            new UniqueEntityID('answer-1'))

        await inMemoryAnswersRepository.create(newAnswer)

        const result = await sut.execute({
            authorId: 'author-2',
            answerId: newAnswer.id.toString(),
            content: 'Should this be'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })
})

