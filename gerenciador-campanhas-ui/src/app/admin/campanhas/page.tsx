'use client'

import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  Switch,
} from "@material-tailwind/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUsuarioContext } from "@/context/UsuarioContext";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { CampanhaType } from "@/types";
import CampanhaForm from "@/components/CampanhaForm";
import { signOut } from "next-auth/react";
import { Status } from "@/enums/status.enum";
import DialogConfirmation from "@/components/DialogConfirmation";


export default function CampanhasAdminPage() {
  const TABLE_HEAD = [
    "Nome",
    "Data Início",
    "Data Fim",
    "Data Cadastro",
    "Status",
    "Categoria",
    "Removido",
    "Ações"
  ];

  const axiosAuth = useAxiosAuth();
  const [open, setOpen] = useState(false);

  const handler = () => setOpen(value => !value);

  const [campanhas, setCampanhas] = useState<CampanhaType[]>();
  const [campanha, setCampanha] = useState<CampanhaType>();
  const [editando, setEditando] = useState(false);
  const [openExcluir, setOpenExcluir] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getCampanhas = async () => {
    try {
      const response = await axiosAuth.get(`campanha`)
      if (response.status === 200) {
        setCampanhas(response.data)
      } else {
        setCampanhas(undefined)
      }
    } catch (error) {
      toast.error('Erro ao carregar campanhas')
    }
  }
  

  let run = true;
  useEffect(() => {
    if (run) getCampanhas();
    return () => { run = false }
  }, [])


  const onEdit = (campanha: CampanhaType) => {
    setCampanha(campanha);
    setEditando(true);
    handler();
  }

  const novaCampanha = () => {
    setCampanha(undefined);
    setEditando(false);
    handler();
  }

  const update = () => {
    getCampanhas();
    handler();
  }

  const handlerExcluir = () => {
    setOpenExcluir(!openExcluir);
  }

  const onExcluir = (item: CampanhaType) => {
    setCampanha(item);
    handlerExcluir();
  }

  const excluir = async () => {
    try {
      setIsLoading(true);
      const response = await axiosAuth.delete(`campanha/${campanha?.id}`)
      setIsLoading(false);
      if (response.status == 200) {
        handlerExcluir();
        toast.success('Campanha removida com sucesso')
        getCampanhas();
      }
    } catch (error) {
      handlerExcluir();
      setIsLoading(false);
      toast.error('Erro ao remover campanha')
      console.log(error)
    }
  }

  return (
    <Card className="mt-2 w-full" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} placeholder={undefined}>
      <CardHeader floated={false} shadow={false} className="rounded-none" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} placeholder={undefined}>
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} placeholder={undefined}>
              Campanhas
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button className="flex items-center gap-3" size="sm" onClick={() => novaCampanha()} onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} placeholder={undefined}>
              <PlusIcon strokeWidth={2} className="h-4 w-4" /> Cadastrar campanha
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll md:h-[calc(75vh-2rem)] h-[calc(60vh-2rem)]" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} placeholder={undefined}>
        <table className="w-full table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                    onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} placeholder={undefined}
                  >
                    {head ?? ''}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {campanhas?.map((item, index) => {
              const isLast = index === campanhas.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={item.id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold"
                      onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} placeholder={undefined}
                    >
                      {item.nome ?? ''}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} placeholder={undefined}
                    >
                      {Intl.DateTimeFormat('pt-BR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      }).format(new Date(item?.dataInicio))}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} placeholder={undefined}
                    >
                      {Intl.DateTimeFormat('pt-BR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      }).format(new Date(item?.dataFim))}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} placeholder={undefined}
                    >
                      {item?.dataCadastro && Intl.DateTimeFormat('pt-BR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      }).format(new Date(item?.dataCadastro))}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        className="capitalize"
                        value={item?.status}
                        color={item?.status == Status.Ativa ? "green" : "blue-gray"}
                      />
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold"
                      onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} placeholder={undefined}
                    >
                      {item.categoria ?? ''}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        className="capitalize"
                        value={item?.removido ? "Sim" : "Não"}
                        color={item?.removido ? "red" : "green"}
                      />
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center justify-between">
                      <div className="mr-2">
                        <Tooltip content="Editar">
                          <IconButton variant="text" onClick={() => onEdit(item)}
                            onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} placeholder={undefined}>
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </div>
                      <div className="mr-2">
                        <Tooltip content="Remover">
                          <IconButton variant="filled" color="red" onClick={() => onExcluir(item)}
                            onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} placeholder={undefined}>
                            <TrashIcon className="h-4 w-4 text-white" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            },
            )}
          </tbody>
        </table>
      </CardBody>
      <Dialog open={open} handler={handler} size='sm' onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} placeholder={undefined}>
        <DialogHeader className='flex flex-col items-start' onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} placeholder={undefined}>
          <Typography variant='h6' className='mb-4' onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} placeholder={undefined}>
            {editando ? 'Editar' : 'Nova'} Campanha
          </Typography>
        </DialogHeader>
        <DialogBody onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} placeholder={undefined}>
          <CampanhaForm campanha={campanha} update={update} handler={handler} />
        </DialogBody>
      </Dialog>
      <DialogConfirmation open={openExcluir} handler={handlerExcluir} onSubmit={excluir} isLoading={isLoading} title='Tem certeza que deseja excluir?' />
    </Card>
  );
}
