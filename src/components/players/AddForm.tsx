'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-toastify'

const AddForm = () => {
  const playerSchema = z
    .object({
      firstName: z.string({ required_error: 'champ obligatoire' }).min(1),
      lastName: z.string({ required_error: 'champ obligatoire' }).min(1),
      salary: z.string().min(1, { message: 'trop court' }).optional(),
      goals: z
        .string()
        .transform((val) => parseInt(val))
        .optional(),
      currency: z.string().optional(),
    })
    .refine((data) => ['$', 'MAD', '€', '£', 'Fr'].includes(data.currency ?? ''), {
      message: 'devise inconnue',
    })

  type Player = z.infer<typeof playerSchema>
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Player>({
    resolver: zodResolver(playerSchema),
  })
  const onSubmit: SubmitHandler<Player> = async (data) => {
    try {
      const r = await fetch('/api/players/add', {
        method: 'POST',
        body: JSON.stringify({ player: data }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (r && r.status === 200) {
        toast('Toast is good', { hideProgressBar: true, autoClose: 2000, type: 'success' })
      }
    } catch (e: any) {
      toast(`Error:${e.message}`, { hideProgressBar: true, autoClose: 2000, type: 'error' })
    }
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-2 flex flex-col space-y-5 max-w-6xl mx-auto items-center p-4 mb-16"
      >
        <div className="w-full">
          <input
            required
            placeholder="prenom*"
            {...register('firstName')}
            name="firstName"
            type="text"
            id="firstName"
          />
          {errors && errors.firstName && <span>{errors.firstName.message}</span>}
        </div>
        <div className="w-full">
          <input required placeholder="nom*" {...register('lastName')} name="lastName" type="text" id="lastName" />
          {errors && errors.lastName && <span>{errors.lastName.message}</span>}
        </div>
        <div className="w-full">
          <input placeholder="salaire annuelle" {...register('salary')} name="salary" type="text" id="salary"></input>
          {errors && errors.salary && <span>{errors.salary.message}</span>}
        </div>
        <div className="w-full">
          <input placeholder="but*" {...register('goals')} name="goals" type="text" id="goals"></input>
          {errors && errors.goals && <span>{errors.goals.message}</span>}
        </div>
        <div className="w-full">
          <select defaultValue={'$'} {...register('currency')}>
            {['$', 'MAD', '€', '£', 'Fr'].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors && errors.firstName && <span>{errors.firstName.message}</span>}
        </div>
        <div>
          <button
            type="submit"
            className="w-full shadow-md rounded-sm p-4 bg-blue-500 border-1 border-blue-200 hover:border-none focus:border-none"
          >
            submit
          </button>
        </div>
      </form>
    </div>
  )
}
export default AddForm
