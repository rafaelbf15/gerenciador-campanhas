import useAxiosAuth from "@/hooks/useAxiosAuth";
import { Helpers } from "@/utils";
import { Button, Input } from "@material-tailwind/react";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CampanhaType } from "@/types";
import Select, { ActionMeta, MultiValue } from "react-select";
import { formatDate } from "@/utils/helpers";

interface IProps {
  campanha?: CampanhaType;
  update: () => void;
  handler: () => void;
}

interface SelectProps {
  value: string,
  label: string
}

export default function CampanhaForm({ campanha, update, handler }: IProps) {
  const axiosAuth = useAxiosAuth();
  const [values, setValues] = useState<CampanhaType>({
    id: undefined,
    nome: '',
    dataInicio: formatDate(new Date()),
    dataFim: formatDate(new Date()),
    status: '',
    categoria: '',
    removido: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<SelectProps | null | undefined>();
  const [selectedCategoria, setSelectedCategoria] = useState<SelectProps | null | undefined>();

  const statusOptions = [
    { value: 'Ativa', label: 'Ativa' },
    { value: 'Pausada', label: 'Pausada' },
    { value: 'Expirada', label: 'Expirada' },
  ]

  const categoriaOptions = [
    { value: 'Reconhecimento', label: 'Reconhecimento' },
    { value: 'Tráfego', label: 'Tráfego' },
    { value: 'Engajamento', label: 'Engajamento' },
    { value: 'Cadastros', label: 'Cadastros' },
    { value: 'Promoção do app', label: 'Promoção do app' },
    { value: 'Vendas', label: 'Vendas' },
  ]

  useEffect(() => {
    setValues({
      id: campanha?.id ?? undefined,
      nome: campanha?.nome ?? '',
      dataInicio: campanha?.dataInicio ?? new Date(),
      dataFim: campanha?.dataFim ?? new Date(),
      status: campanha?.status ?? '',
      categoria: campanha?.categoria ?? '',
      removido: campanha?.removido ?? false,
    })
    setSelectedStatus(statusOptions.find((status) => status.value === campanha?.status) || null);
    setSelectedCategoria(categoriaOptions.find((categoria) => categoria.value === campanha?.categoria) || null);
  }, [campanha])


  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const msgSuccess = campanha ? 'Campanha atualizada com sucesso!' : 'Campanha salva com sucesso!';
    const msgError = campanha ? 'Erro ao atualizar campanha!' : 'Erro ao salvar campanha!';

    try {
      setIsLoading(true);
      const data = {
        ...values,
        status: selectedStatus?.value,
        categoria: selectedCategoria?.value,
      }
      const url = campanha ? `campanha/${campanha.id}` : 'campanha';
      const method = campanha ? 'PUT' : 'POST';
      const response = await axiosAuth.request({
        url,
        method,
        data
      });
      setIsLoading(false)
      if (response.status === 200 || response.status === 201) {
        toast.success(msgSuccess)
        update();
      }
    } catch (error) {
      setIsLoading(false);
      if ((error as any).response.data.statusCode == 400) {
        setErrors((error as any).response.data.message?.map((msg: any[]) => ({ message: msg[0] })))
      }
      toast.error(msgError)
    }
  }

  const SelectComponent = useCallback(({ selectedDefaultValue, options, onChangeSelect, name, id }: any) => {

    return (
      <Select
        defaultValue={selectedDefaultValue}
        id={id}
        name={name}
        required
        noOptionsMessage={() => 'Nenhum conteúdo encontrado'}
        options={options}
        className="w-full"
        placeholder="Selecione"
        onChange={(newValue: MultiValue<any>, actionMeta: ActionMeta<any>) => onChangeSelect(newValue)}
      />
    )
  }, [campanha, selectedStatus, selectedCategoria])

  return (
    <div className="flex flex-col">
      <div className="mb-2">
        {
          errors?.length > 0 && errors.map((error: any, i: number) => (
            <p key={i} className="text-red-500 text-sm mt-2">{error.message}</p>
          ))
        }
      </div>
      <div>
        <form onSubmit={onSubmit}>
          <div className='flex flex-col'>
            <div className='mb-4'>
              <Input
                label='Nome'
                name='nome'
                required
                id="nome"
                size="lg"
                value={values?.['nome'] ?? ''}
                onChange={(event: ChangeEvent<HTMLInputElement>) => Helpers.onChangeHandleErrors(setValues, setErrors, event)}
                onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} placeholder={undefined}
                crossOrigin={undefined} />
            </div>
            <div className='mb-4'>
              <Input
                label='Data Início'
                name='dataInicio'
                required
                id="dataInicio"
                size="lg"
                type="datetime-local"
                value={formatDate(values?.['dataInicio'])}
                onChange={(event: ChangeEvent<HTMLInputElement>) => Helpers.onChangeHandleErrors(setValues, setErrors, event)}
                onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} placeholder={undefined}
                crossOrigin={undefined} />
            </div>
            <div className='mb-4'>
              <Input
                label='Data Fim'
                name='dataFim'
                required
                id="dataFim"
                size="lg"
                type="datetime-local"
                value={formatDate(values?.['dataFim'])}
                onChange={(event: ChangeEvent<HTMLInputElement>) => Helpers.onChangeHandleErrors(setValues, setErrors, event)}
                onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} placeholder={undefined}
                crossOrigin={undefined} />
            </div>
            <div className='mb-4'>
              <SelectComponent selectedDefaultValue={selectedStatus} options={statusOptions} onChangeSelect={setSelectedStatus} />
            </div>
            <div className='mb-4'>
              <SelectComponent selectedDefaultValue={selectedCategoria} options={categoriaOptions} onChangeSelect={setSelectedCategoria} />
            </div>
            <div className='flex'>
              <Button type='submit' variant="gradient" disabled={isLoading} onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} placeholder={undefined}>
                {isLoading ? 'Salvando...' : 'Salvar'}
              </Button>
              <Button type="button" variant="text" color="red" onClick={() => handler()} className="ml-1" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} placeholder={undefined}>
                Cancelar
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}