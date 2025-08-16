"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Droplets, TrendingUp, AlertTriangle, CheckCircle, Activity, Beaker, Thermometer, Zap } from "lucide-react"

// Mock data for charts
const waterQualityTrend = [
  { month: "Jan", ph: 7.2, turbidity: 2.1, dissolved_oxygen: 8.5, temperature: 15 },
  { month: "Feb", ph: 7.1, turbidity: 2.3, dissolved_oxygen: 8.2, temperature: 16 },
  { month: "Mar", ph: 7.3, turbidity: 1.9, dissolved_oxygen: 8.7, temperature: 18 },
  { month: "Apr", ph: 7.0, turbidity: 2.5, dissolved_oxygen: 8.1, temperature: 20 },
  { month: "May", ph: 7.2, turbidity: 2.0, dissolved_oxygen: 8.6, temperature: 22 },
  { month: "Jun", ph: 7.4, turbidity: 1.8, dissolved_oxygen: 8.9, temperature: 25 },
]

const contaminantLevels = [
  { name: "Chlorine", value: 0.5, safe: 2.0, color: "#059669" },
  { name: "Lead", value: 0.003, safe: 0.015, color: "#10b981" },
  { name: "Nitrates", value: 8.2, safe: 10.0, color: "#34d399" },
  { name: "Bacteria", value: 2, safe: 100, color: "#6ee7b7" },
]

const qualityDistribution = [
  { name: "Excellent", value: 45, color: "#059669" },
  { name: "Good", value: 35, color: "#10b981" },
  { name: "Fair", value: 15, color: "#fbbf24" },
  { name: "Poor", value: 5, color: "#ef4444" },
]

export default function WaterQualityPredictor() {
  const [prediction, setPrediction] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    ph: "",
    turbidity: "",
    temperature: "",
    dissolved_oxygen: "",
    location: "",
  })

  const handlePredict = async () => {
    setLoading(true)
    // Simulate AI prediction
    setTimeout(() => {
      const score = Math.random() * 100
      const quality = score > 80 ? "Excellent" : score > 60 ? "Good" : score > 40 ? "Fair" : "Poor"
      const color =
        score > 80 ? "text-green-600" : score > 60 ? "text-blue-600" : score > 40 ? "text-yellow-600" : "text-red-600"

      setPrediction({
        score: Math.round(score),
        quality,
        color,
        recommendations: [
          "Monitor chlorine levels regularly",
          "Check for bacterial contamination",
          "Maintain optimal pH balance",
          "Ensure proper filtration system",
        ],
      })
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary rounded-lg">
                <Droplets className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">AquaPredict</h1>
                <p className="text-sm text-muted-foreground">AI-Powered Water Quality Analysis</p>
              </div>
            </div>
            <Badge variant="secondary" className="px-3 py-1">
              <Activity className="h-3 w-3 mr-1" />
              Live Monitoring
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="predict">AI Predictor</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Overall Quality</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">Excellent</div>
                  <p className="text-xs text-muted-foreground">Score: 87/100</p>
                  <Progress value={87} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">pH Level</CardTitle>
                  <Beaker className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7.2</div>
                  <p className="text-xs text-muted-foreground">Optimal range: 6.5-8.5</p>
                  <Progress value={75} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Temperature</CardTitle>
                  <Thermometer className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">22°C</div>
                  <p className="text-xs text-muted-foreground">Ideal: 20-25°C</p>
                  <Progress value={80} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Dissolved O₂</CardTitle>
                  <Zap className="h-4 w-4 text-cyan-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8.6 mg/L</div>
                  <p className="text-xs text-muted-foreground">Minimum: 5.0 mg/L</p>
                  <Progress value={95} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Water Quality Trends
                  </CardTitle>
                  <CardDescription>6-month historical data</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      ph: { label: "pH Level", color: "hsl(var(--chart-1))" },
                      dissolved_oxygen: { label: "Dissolved O₂", color: "hsl(var(--chart-2))" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={waterQualityTrend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line type="monotone" dataKey="ph" stroke="var(--color-ph)" strokeWidth={2} />
                        <Line
                          type="monotone"
                          dataKey="dissolved_oxygen"
                          stroke="var(--color-dissolved_oxygen)"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quality Distribution</CardTitle>
                  <CardDescription>Current water quality ratings</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      excellent: { label: "Excellent", color: "#059669" },
                      good: { label: "Good", color: "#10b981" },
                      fair: { label: "Fair", color: "#fbbf24" },
                      poor: { label: "Poor", color: "#ef4444" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={qualityDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {qualityDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Contaminant Levels */}
            <Card>
              <CardHeader>
                <CardTitle>Contaminant Levels</CardTitle>
                <CardDescription>Current levels vs. safety thresholds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contaminantLevels.map((item) => (
                    <div key={item.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {item.value} / {item.safe} {item.name === "Bacteria" ? "CFU/100ml" : "mg/L"}
                        </span>
                      </div>
                      <Progress value={(item.value / item.safe) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Predictor Tab */}
          <TabsContent value="predict" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Water Quality Prediction</CardTitle>
                  <CardDescription>Enter water parameters for AI analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ph">pH Level</Label>
                      <Input
                        id="ph"
                        placeholder="7.0"
                        value={formData.ph}
                        onChange={(e) => setFormData({ ...formData, ph: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="turbidity">Turbidity (NTU)</Label>
                      <Input
                        id="turbidity"
                        placeholder="2.0"
                        value={formData.turbidity}
                        onChange={(e) => setFormData({ ...formData, turbidity: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="temperature">Temperature (°C)</Label>
                      <Input
                        id="temperature"
                        placeholder="22"
                        value={formData.temperature}
                        onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dissolved_oxygen">Dissolved O₂ (mg/L)</Label>
                      <Input
                        id="dissolved_oxygen"
                        placeholder="8.5"
                        value={formData.dissolved_oxygen}
                        onChange={(e) => setFormData({ ...formData, dissolved_oxygen: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Municipal Water Plant A"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                  <Button onClick={handlePredict} disabled={loading} className="w-full">
                    {loading ? "Analyzing..." : "Predict Water Quality"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Prediction Results</CardTitle>
                  <CardDescription>AI-powered water quality assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  {prediction ? (
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className={`text-4xl font-bold ${prediction.color}`}>{prediction.score}/100</div>
                        <div className={`text-xl font-semibold ${prediction.color}`}>{prediction.quality}</div>
                        <Progress value={prediction.score} className="mt-2" />
                      </div>

                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          Based on the provided parameters, the water quality is rated as{" "}
                          {prediction.quality.toLowerCase()}.
                        </AlertDescription>
                      </Alert>

                      <div>
                        <h4 className="font-semibold mb-2">Recommendations:</h4>
                        <ul className="space-y-1">
                          {prediction.recommendations.map((rec: string, index: number) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      <Droplets className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Enter water parameters and click "Predict" to see AI analysis results</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Temperature & Turbidity Analysis</CardTitle>
                <CardDescription>Correlation between temperature and water clarity</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    temperature: { label: "Temperature (°C)", color: "hsl(var(--chart-4))" },
                    turbidity: { label: "Turbidity (NTU)", color: "hsl(var(--chart-2))" },
                  }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={waterQualityTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="temperature"
                        stackId="1"
                        stroke="var(--color-temperature)"
                        fill="var(--color-temperature)"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="turbidity"
                        stackId="2"
                        stroke="var(--color-turbidity)"
                        fill="var(--color-turbidity)"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Parameter Comparison</CardTitle>
                <CardDescription>Comparative analysis of key water quality indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    ph: { label: "pH Level", color: "hsl(var(--chart-1))" },
                    turbidity: { label: "Turbidity", color: "hsl(var(--chart-2))" },
                    dissolved_oxygen: { label: "Dissolved O₂", color: "hsl(var(--chart-3))" },
                  }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={waterQualityTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="ph" fill="var(--color-ph)" />
                      <Bar dataKey="turbidity" fill="var(--color-turbidity)" />
                      <Bar dataKey="dissolved_oxygen" fill="var(--color-dissolved_oxygen)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Monthly Report</CardTitle>
                  <CardDescription>Comprehensive water quality analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Excellent
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Samples:</span>
                      <span>1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Compliance:</span>
                      <span>98.5%</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    Download Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Compliance Report</CardTitle>
                  <CardDescription>Regulatory compliance status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>EPA Standards:</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Compliant
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>WHO Guidelines:</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Compliant
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Local Standards:</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Compliant
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    View Details
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Trend Analysis</CardTitle>
                  <CardDescription>6-month quality trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Overall Trend:</span>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        Improving
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>pH Stability:</span>
                      <span>95%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Contamination:</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Low
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
