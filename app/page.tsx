"use client"
import { useRouter } from "next/navigation"
import { DashboardRedirect } from "@/components/dashboard-redirect"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { useLanguage } from "@/hooks/use-language"
import { LanguageSwitcher } from "@/components/language-switcher"
import { UtensilsCrossed, Users, ShoppingCart } from "lucide-react"

export default function Home() {
  const { isAuthenticated } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  if (isAuthenticated) {
    return <DashboardRedirect />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="w-8 h-8 text-orange-600" />
            <span className="text-2xl font-bold text-gray-900">{t("appName")}</span>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button onClick={() => router.push("/login")} variant="outline">
              {t("staffLogin")}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {t("welcome")} <span className="text-orange-600">{t("appName")}</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">{t("heroDescription")}</p>
        </div>

        {/* Main CTA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Customer Order Card */}
          <Card className="border-2 border-orange-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <ShoppingCart className="w-12 h-12 text-orange-600 mb-4" />
              <CardTitle className="text-2xl">{t("orderNow")}</CardTitle>
              <CardDescription>{t("orderDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">{t("orderDetails")}</p>
              <Button
                onClick={() => router.push("/order")}
                size="lg"
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                {t("startOrdering")}
              </Button>
            </CardContent>
          </Card>

          {/* Staff Login Card */}
          <Card className="border-2 border-blue-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <CardTitle className="text-2xl">{t("staffPortal")}</CardTitle>
              <CardDescription>{t("staffPortalDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">{t("staffPortalDetails")}</p>
              <Button onClick={() => router.push("/login")} size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                {t("staffLogin")}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg border p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t("features")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("easyOrdering")}</h3>
              <p className="text-gray-600">{t("easyOrderingDesc")}</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("roleBasedAccess")}</h3>
              <p className="text-gray-600">{t("roleBasedAccessDesc")}</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <UtensilsCrossed className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("realTimeKitchen")}</h3>
              <p className="text-gray-600">{t("realTimeKitchenDesc")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-gray-50 mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 text-center text-gray-600">
          <p>{t("copyright")}</p>
        </div>
      </footer>
    </div>
  )
}
