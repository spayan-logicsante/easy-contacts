import { useState } from 'react'
import { UserPlus, Phone, Smartphone, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import type { Contact } from '@/types'
import { ROLE_SUGGESTIONS } from '@/types'

interface ContactFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: Omit<Contact, 'id'>) => void
  initialData?: Contact
}

export function ContactForm({ open, onOpenChange, onSubmit, initialData }: ContactFormProps) {
  const [firstName, setFirstName] = useState(initialData?.firstName ?? '')
  const [lastName, setLastName] = useState(initialData?.lastName ?? '')
  const [role, setRole] = useState(initialData?.role ?? '')
  const [phoneFixed, setPhoneFixed] = useState(initialData?.phoneFixed ?? '')
  const [phoneMobile, setPhoneMobile] = useState(initialData?.phoneMobile ?? '')
  const [showRoleSuggestions, setShowRoleSuggestions] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!firstName.trim() || !lastName.trim() || !role.trim()) return
    onSubmit({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      role: role.trim(),
      phoneFixed: phoneFixed.trim() || undefined,
      phoneMobile: phoneMobile.trim() || undefined,
    })
    if (!initialData) {
      setFirstName('')
      setLastName('')
      setRole('')
      setPhoneFixed('')
      setPhoneMobile('')
    }
    onOpenChange(false)
  }

  const resetForm = () => {
    setFirstName(initialData?.firstName ?? '')
    setLastName(initialData?.lastName ?? '')
    setRole(initialData?.role ?? '')
    setPhoneFixed(initialData?.phoneFixed ?? '')
    setPhoneMobile(initialData?.phoneMobile ?? '')
  }

  const filteredSuggestions = ROLE_SUGGESTIONS.filter((s) =>
    s.toLowerCase().includes(role.toLowerCase())
  )

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) resetForm()
      onOpenChange(isOpen)
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            {initialData ? 'Modifier le contact' : 'Nouveau contact'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Prénom *</label>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Jean"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Nom *</label>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Dupont"
                required
              />
            </div>
          </div>
          <div className="space-y-2 relative">
            <label className="text-sm font-medium flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              Rôle / Fonction *
            </label>
            <Input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              onFocus={() => setShowRoleSuggestions(true)}
              onBlur={() => setTimeout(() => setShowRoleSuggestions(false), 200)}
              placeholder="Ex: Médecin radiologue"
              required
            />
            {showRoleSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {filteredSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors"
                    onMouseDown={() => {
                      setRole(suggestion)
                      setShowRoleSuggestions(false)
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                Téléphone fixe
              </label>
              <Input
                value={phoneFixed}
                onChange={(e) => setPhoneFixed(e.target.value)}
                placeholder="01 23 45 67 89"
                type="tel"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-muted-foreground" />
                Téléphone portable
              </label>
              <Input
                value={phoneMobile}
                onChange={(e) => setPhoneMobile(e.target.value)}
                placeholder="06 12 34 56 78"
                type="tel"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">
              {initialData ? 'Enregistrer' : 'Ajouter'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
