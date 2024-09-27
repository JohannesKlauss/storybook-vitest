import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {z} from "zod";

const schema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
})

export interface ModalProps {
  onSubmit: (name: string, username: string) => void
  name: string
  email: string
}

export const EditProfile = ({onSubmit, name = '', email = ''}: ModalProps) => {
  const [inputName, setInputName] = useState(name)
  const [inputEmail, setInputEmail] = useState(email)
  const [open, setOpen] = useState(false)

  const [emailError, setEmailError] = useState<string | null>(null)
  const [nameError, setNameError] = useState<string | null>(null)

  const submit = () => {
    try {
      schema.parse({name: inputName, email: inputEmail})

      //setEmailError(null)
      //setNameError(null)
      setOpen(false)
      onSubmit(inputName.trim(), inputEmail.trim())
    } catch (e) {
      if (e instanceof z.ZodError) {
        setEmailError(e.errors.find((error) => error.path[0] === 'email')?.message ?? null)
        setNameError(e.errors.find((error) => error.path[0] === 'name')?.message ?? null)
      }
    }
  }

  return (
    <Accordion type="single" collapsible value={open ? 'item-1' : ''}>
      <AccordionItem value="item-1">
        <AccordionTrigger className={'min-w-80'} onClick={() => setOpen(!open)}>Edit Your Spaceteams Profile</AccordionTrigger>
        <AccordionContent>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="st-name" className="text-right">
                Name
              </Label>
              <Input
                id="st-name"
                className={['col-span-3', nameError ? 'border-red-500' : '']}
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
              />
              <div></div>
              <div className={'col-span-3 -mt-3 text-xs text-red-500'}>{nameError}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                className={['col-span-3', emailError ? 'border-red-500' : '']}
                type={'email'}
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
              />
              <div></div>
              <div className={'col-span-3 -mt-3 text-xs text-red-500'}>{emailError}</div>
            </div>

            {open && <Button type="submit" className={'bg-zinc-500'} onClick={submit}>Save changes</Button>}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
