'use client'

import { useForm, Controller, Field } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlayerSchemaType, playerSchema } from '@/lib/validation/schema'
import { PlayerType } from '@/lib/types'
import { getBase64, onSubmit, onSubmitUpdate } from '@/lib/helpers'
import { validateImage } from 'image-validator'

const AddForm = ({ playerData, isEditMode = false }: { playerData?: PlayerType; isEditMode?: boolean }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PlayerSchemaType>({
    resolver: zodResolver(playerSchema),
    defaultValues: {
      id: playerData?.id ?? 0,
      firstName: playerData?.firstName ?? '',
      lastName: playerData?.lastName ?? '',
      currency: playerData?.currency ?? '$',
      goals: playerData?.goals?.toString() ?? '0',
      salary: playerData?.salary ?? '0',
      pictureURl: undefined,
    },
  })

  return (
    <div>
      <form
        onSubmit={isEditMode ? handleSubmit(onSubmitUpdate) : handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="grid grid-cols-1 grid-flow-row gap-8 py-8 px-20"
      >
        <div className="w-full flex flex-col ">
          <input
            required
            className="h-10 border-2 border-gray-500 shadow-sm rounded-sm hover:shadow-md hover:border-none focus:shadow-md focus:border-none px-4 "
            placeholder="prenom*"
            {...register('firstName')}
            name="firstName"
            type="text"
            id="firstName"
          />
          {errors && errors.firstName && (
            <span className="p-4 my-2 bg-red-400 text-sm shadow-sm rounded-sm">{errors.firstName.message}</span>
          )}
        </div>
        <div className="w-full flex flex-col">
          <input
            required
            className="h-10 border-2 border-gray-500 shadow-sm rounded-sm hover:shadow-md hover:border-none focus:shadow-md focus:border-none px-4 "
            placeholder="nom*"
            {...register('lastName')}
            name="lastName"
            type="text"
            id="lastName"
          />
          {errors && errors.lastName && (
            <span className="p-4 my-2 bg-red-400 text-sm shadow-sm rounded-sm">{errors.lastName.message}</span>
          )}
        </div>
        <div className="w-full flex flex-col">
          <input
            className="h-10 border-2 border-gray-500 shadow-sm rounded-sm hover:shadow-md hover:border-none focus:shadow-md focus:border-none px-4 "
            placeholder="salaire annuelle"
            {...register('salary')}
            name="salary"
            type="text"
            id="salary"
          ></input>
          {errors && errors.salary && (
            <span className="p-4 my-2 bg-red-400 text-sm shadow-sm rounded-sm">{errors.salary.message}</span>
          )}
        </div>
        <div className="w-full flex flex-col">
          <input
            className="h-10 border-2 border-gray-500 shadow-sm rounded-sm hover:shadow-md hover:border-none focus:shadow-md focus:border-none px-4 "
            placeholder="but*"
            {...register('goals')}
            name="goals"
            type="text"
            id="goals"
          ></input>
          {errors && errors.goals && (
            <span className="p-4 my-2 bg-red-400 text-sm shadow-sm rounded-sm">{errors.goals.message}</span>
          )}
        </div>
        {/* image upload */}
        <div className="w-full flex flex-col">
          <Controller
            control={control}
            name={'pictureURl'}
            rules={{ required: 'Recipe picture is required' }}
            render={({ field: { value, onChange, ...field } }) => {
              return (
                <input
                  className="h-10 border-2 border-gray-500 shadow-sm rounded-sm hover:shadow-md hover:border-none focus:shadow-md focus:border-none px-4 "
                  {...field}
                  // {...register('pictureURl')}
                  onChange={async (event) => {
                    if (event.target.files === null) return
                    const imageFile = event.target.files[0]
                    const isImageValid = await validateImage(imageFile)
                    if (isImageValid) {
                      const r = await getBase64(event.target.files[0])
                      onChange({
                        binary: r,
                        imageName: event.target.files[0].name,
                        imageType: event.target.files[0].type,
                      })
                    }
                  }}
                  type="file"
                  id="pictureURl"
                  name="pictureURl"
                />
              )
            }}
          />

          {errors && errors.pictureURl && (
            <span className="p-4 my-2 bg-red-400 text-sm shadow-sm rounded-sm">
              {errors.pictureURl.message?.toString()}
            </span>
          )}
        </div>
        <div className="w-full flex gap-16">
          <div className="flex-grow">
            <select
              className="h-10 w-full border-2 border-gray-500 shadow-sm rounded-sm hover:shadow-md hover:border-none focus:shadow-md focus:border-none px-4"
              defaultValue={'$'}
              {...register('currency')}
            >
              {['$', 'MAD', '€', '£', 'Fr'].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors && errors.currency && (
              <span className="p-4 my-2 bg-red-400 text-sm shadow-sm rounded-sm">{errors.currency.message}</span>
            )}
          </div>
          <div className="flex-grow">
            <button
              type="submit"
              className="w-full h-10 shadow-md my-auto rounded-sm bg-blue-500 border-1 border-blue-200 hover:border-none focus:border-none"
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
export default AddForm
