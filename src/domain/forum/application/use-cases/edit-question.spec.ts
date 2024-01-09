import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { EditQuestionUseCase } from './edit-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
    })

    it('should be able to edit question', async () => {
        const newQuestion = makeQuestion({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('question-1'))
        await inMemoryQuestionsRepository.create(newQuestion)

        await sut.execute({
            authorId: 'author-1',
            questionId: newQuestion.id.toString(),
            title: 'Title nice',
            content: 'Should this be'
        })

        expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
            title: 'Title nice',
            content: 'Should this be'
        })
    })

    it('should not be able to edit question from another user', async () => {
        const newQuestion = makeQuestion(
            {
                authorId: new UniqueEntityID('author-1')
            },
            new UniqueEntityID('question-1'))

        await inMemoryQuestionsRepository.create(newQuestion)

        const result = await sut.execute({
            authorId: 'author-2',
            questionId: newQuestion.id.toString(),
            title: 'Title nice',
            content: 'Should this be'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })
})

