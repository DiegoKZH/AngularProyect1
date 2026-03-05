import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgApexchartsModule } from "ng-apexcharts";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  standalone: true,
  imports: [
    CommonModule,
    NgApexchartsModule
  ]
})
export class DashboardComponent {
  isProfileOpen = false;

  // Gráfico de Ingresos (Barras)
  public revenueChart: any = {
    series: [
      { name: "Last 6 days", data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 60], color: '#5B67F1' },
      { name: "Last Week", data: [13, 23, 20, 8, 13, 27, 33, 12, 11, 15, 21, 24], color: '#E8E9F2' }
    ],
    chart: { type: "bar", height: 250, stacked: false, toolbar: { show: false } },
    plotOptions: { bar: { columnWidth: "30%", borderRadius: 2 } },
    dataLabels: { enabled: false },
    xaxis: { categories: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"] },
    legend: { show: false }
  };

  // Gráfico de Tiempo de Orden (Donut)
  public orderTimeChart: any = {
    series: [40, 32, 28],
    chart: { 
      type: "donut", 
      height: 250, 
      fontFamily: 'Segoe UI, sans-serif'
    },
    labels: ["Afternoon", "Evening", "Morning"],
    colors: ["#6470cb", "#929DF0", "#a1abfa"], 
    plotOptions: {
      pie: {
        donut: {
          size: '72%',
          labels: { show: false }
        },
        expandOnClick: false 
      }
    },
    dataLabels: { enabled: false },
    stroke: { width: 0 }, 
    legend: { show: false }, 
    tooltip: {
      enabled: true,
      // Creamos el diseño personalizado del cuadro morado oscuro
      custom: function({ series, seriesIndex, dataPointIndex, w }: any) {
        const times = ["1pm - 4pm", "5pm - 8pm", "8am - 12pm"];
        const orders = ["1.890", "1.512", "1.323"];
        const label = w.globals.labels[seriesIndex];

        return `
          <div class="custom-tooltip">
            <div class="tooltip-title">${label}</div>
            <div class="tooltip-time">${times[seriesIndex]}</div>
            <div class="tooltip-orders">${orders[seriesIndex]} orders</div>
          </div>
        `;
      }
    }
  };

  // Gráfico de Órdenes (Líneas)
  public orderChart: any = {
    series: [
      { name: "Last 6 days", data: [25, 18, 50, 45, 20, 75], color: '#5B67F1' },
      { name: "Last Week", data: [40, 60, 20, 58, 42, 50], color: '#E8E9F2' }
    ],
    chart: { 
      type: "line",
      height: 230, 
      toolbar: { show: false },
      fontFamily: 'Segoe UI, sans-serif'
    },
    dataLabels: { enabled: false },
    stroke: { 
      curve: "straight", 
      width: 3 
    },
    grid: {
      show: true,
      borderColor: '#E8E9F2',
      strokeDashArray: 4, 
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } }
    },
    xaxis: { 
      categories: ["01", "02", "03", "04", "05", "06"],
      axisBorder: { show: true, color: '#E8E9F2' },
      axisTicks: { show: false },
      labels: { style: { colors: '#A2A2C2', fontSize: '12px' } }
    },
    yaxis: { 
      show: false
    },
    legend: { 
      show: true,
      position: 'bottom',
      horizontalAlign: 'left',
      markers: { radius: 12 },
      fontSize: '13px',
      fontWeight: 500,
      labels: { colors: '#4A4A68' },
      itemMargin: { horizontal: 15, vertical: 15 }
    }
  };

  toggleProfile() {
    this.isProfileOpen = !this.isProfileOpen;
  }
}