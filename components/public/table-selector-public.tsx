"use client"

import { useState } from "react"
import { useLanguage } from "@/hooks/use-language"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface TableSelectorPublicProps {
  onSelectTable: (tableNumber: number) => void
  selectedTable: number | null
}

export function TableSelectorPublic({ onSelectTable, selectedTable }: TableSelectorPublicProps) {
  const { t } = useLanguage()
  const [manualTable, setManualTable] = useState("")
  const [error, setError] = useState("")

  const handleSelectTable = (tableNumber: number) => {
    onSelectTable(tableNumber)
    setError("")
  }

  const handleManualTable = () => {
    const tableNum = Number.parseInt(manualTable)
    if (isNaN(tableNum) || tableNum < 1) {
      setError(t("pleaseSelectTable"))
      return
    }
    handleSelectTable(tableNum)
    setManualTable("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("selectTable")}</CardTitle>
        <CardDescription>{t("chooseTableNumber")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((tableNum) => (
            <Button
              key={tableNum}
              variant={selectedTable === tableNum ? "default" : "outline"}
              onClick={() => handleSelectTable(tableNum)}
              className="h-12 text-lg font-semibold"
            >
              {tableNum}
            </Button>
          ))}
        </div>

        <div className="border-t pt-4 space-y-2">
          <label className="text-sm font-medium">{t("orEnterTableNumber")}</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder={t("tableNumber")}
              value={manualTable}
              onChange={(e) => setManualTable(e.target.value)}
              min="1"
            />
            <Button onClick={handleManualTable}>{t("go")}</Button>
          </div>
        </div>

        {selectedTable && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
            <p className="text-sm font-medium text-blue-900">
              {t("table")} <span className="text-lg font-bold">{selectedTable}</span> {t("tableSelected")}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
