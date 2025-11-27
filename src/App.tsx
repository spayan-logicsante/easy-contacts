import { useState, useMemo } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { useLicenses } from '@/hooks/useLicenses'
import { Header, type ViewMode } from '@/components/Header'
import { LicenseCard } from '@/components/LicenseCard'
import { LicenseListItem } from '@/components/LicenseListItem'
import { LicenseForm } from '@/components/LicenseForm'
import { EmptyState } from '@/components/EmptyState'

function App() {
  const {
    licenses,
    addLicense,
    updateLicense,
    deleteLicense,
    addContact,
    updateContact,
    deleteContact,
    exportData,
    importData,
  } = useLicenses()

  const [searchQuery, setSearchQuery] = useState('')
  const [addLicenseOpen, setAddLicenseOpen] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('cards')

  const filteredLicenses = useMemo(() => {
    if (!searchQuery.trim()) return licenses

    const query = searchQuery.toLowerCase()
    return licenses.filter((license) => {
      const matchesLicense =
        license.name.toLowerCase().includes(query) ||
        license.licenseNumber.toLowerCase().includes(query) ||
        license.address?.toLowerCase().includes(query)

      const matchesContact = license.contacts.some(
        (contact) =>
          contact.firstName.toLowerCase().includes(query) ||
          contact.lastName.toLowerCase().includes(query) ||
          contact.role.toLowerCase().includes(query) ||
          contact.phoneFixed?.includes(query) ||
          contact.phoneMobile?.includes(query)
      )

      return matchesLicense || matchesContact
    })
  }, [licenses, searchQuery])

  const totalContacts = licenses.reduce((sum, license) => sum + license.contacts.length, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-cyan-50">
      {/* Decorative blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      </div>

      <div className="relative">
        <Toaster position="top-right" richColors />
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddLicense={() => setAddLicenseOpen(true)}
          onExport={exportData}
          onImport={importData}
          totalLicenses={licenses.length}
          totalContacts={totalContacts}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
        <main className="container mx-auto px-4 py-8">
          {licenses.length === 0 ? (
            <EmptyState onAddLicense={() => setAddLicenseOpen(true)} />
          ) : filteredLicenses.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg mb-4">
                <span className="text-3xl">🔍</span>
              </div>
              <p className="text-gray-500 font-medium">Aucun résultat pour "{searchQuery}"</p>
            </div>
          ) : viewMode === 'cards' ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredLicenses.map((license) => (
                <LicenseCard
                  key={license.id}
                  license={license}
                  onUpdate={(data) => updateLicense(license.id, data)}
                  onDelete={() => deleteLicense(license.id)}
                  onAddContact={(contact) => addContact(license.id, contact)}
                  onUpdateContact={(contactId, data) => updateContact(license.id, contactId, data)}
                  onDeleteContact={(contactId) => deleteContact(license.id, contactId)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredLicenses.map((license) => (
                <LicenseListItem
                  key={license.id}
                  license={license}
                  onUpdate={(data) => updateLicense(license.id, data)}
                  onDelete={() => deleteLicense(license.id)}
                  onAddContact={(contact) => addContact(license.id, contact)}
                  onUpdateContact={(contactId, data) => updateContact(license.id, contactId, data)}
                  onDeleteContact={(contactId) => deleteContact(license.id, contactId)}
                />
              ))}
            </div>
          )}
        </main>
        <LicenseForm
          open={addLicenseOpen}
          onOpenChange={setAddLicenseOpen}
          onSubmit={addLicense}
        />
      </div>
    </div>
  )
}

export default App
