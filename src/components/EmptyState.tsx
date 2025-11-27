import { Stethoscope, Plus, Sparkles, Building2, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  onAddLicense: () => void
}

export function EmptyState({ onAddLicense }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      {/* Illustration animée */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="relative">
          <div className="flex items-center justify-center gap-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-100 to-violet-200 animate-bounce" style={{ animationDelay: '0ms' }}>
              <Building2 className="h-8 w-8 text-violet-600" />
            </div>
            <div className="p-5 rounded-3xl bg-gradient-to-br from-fuchsia-500 to-violet-600 shadow-2xl shadow-violet-500/30">
              <Stethoscope className="h-12 w-12 text-white" />
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-fuchsia-100 to-pink-200 animate-bounce" style={{ animationDelay: '150ms' }}>
              <Users className="h-8 w-8 text-fuchsia-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Texte */}
      <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
        Bienvenue sur EasyContacts
        <Sparkles className="h-6 w-6 text-amber-400" />
      </h2>
      <p className="text-gray-500 text-center max-w-md mb-8 leading-relaxed">
        Gérez facilement vos contacts de centres d'imagerie médicale et maisons de santé.
        Commencez par ajouter votre première licence !
      </p>

      {/* Bouton */}
      <Button
        onClick={onAddLicense}
        size="lg"
        className="rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/30 hover:scale-105 px-8"
      >
        <Plus className="h-5 w-5 mr-2" />
        Ajouter une licence
      </Button>

      {/* Features */}
      <div className="grid grid-cols-3 gap-6 mt-12 max-w-lg">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-violet-100 flex items-center justify-center">
            <Building2 className="h-6 w-6 text-violet-600" />
          </div>
          <p className="text-xs text-gray-500 font-medium">Centres & Maisons</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-fuchsia-100 flex items-center justify-center">
            <Users className="h-6 w-6 text-fuchsia-600" />
          </div>
          <p className="text-xs text-gray-500 font-medium">Contacts illimités</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-cyan-100 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-cyan-600" />
          </div>
          <p className="text-xs text-gray-500 font-medium">Export facile</p>
        </div>
      </div>
    </div>
  )
}
