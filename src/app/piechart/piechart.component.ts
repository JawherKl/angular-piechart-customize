import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css'],
})
export class PiechartComponent {
  name = 'Angular';
  protected colorScheme!: any;
  protected dataItem: any;
  protected tooltipContext: any;
  protected tooltipVisible: any;
  protected tooltipStyle: any;
  protected view: [number, number] = [450, 350];

  constructor() {
    this.colorScheme = {
      domain: ['#5e0468', '#ffc100', '#148932', '#798391'],
    }; // Assign color to different items in pie-chart elements
  }

  data = [
    { name: 'Ordinateur', value: 2 },
    { name: 'Mobile', value: 4 },
    { name: 'Tablette', value: 2 },
    { name: 'Indéfini', value: 0 },
  ];

  // Function to get the data of item selected in the pie c
  getDataItem(data: any) {
    this.dataItem = data;
    setTimeout(() => {
      this.onSelectItem(this.dataItem);
    }, 200);
  }

  // Function to handle the selected item in piechart section
  onSelectItem(data: any) {
    if (data) {
      this.tooltipContext = {
        model: {
          name: data.value.name,
          value: data.value.value,
        },
      };
      this.tooltipVisible = true;
      const event = window.event as MouseEvent;
      if (event) {
        this.tooltipStyle = {
          top: `${event.clientY + 10}px`, // Adjust based on your preference
          left: `${event.clientX + 10}px`, // Adjust based on your preference
        };
      }
    }
  }

  // Function to handle mousemove event and update tooltip position
  updateTooltipPosition(event: MouseEvent) {
    if (event) {
      this.tooltipStyle = {
        top: `${event.clientY + 10}px`, // Adjust based on your preference
        left: `${event.clientX + 10}px`, // Adjust based on your preference
      };
    }
  }

  // Function to hide the tooltip
  hideTooltip() {
    this.tooltipVisible = false;
    this.dataItem = '';
  }

  // Function to show the tooltip
  showTooltip(event: MouseEvent) {
    setTimeout(() => {
      this.onSelectItem(this.dataItem);
      this.updateTooltipPosition(event);
    }, 200);
  }

  // Function to determine the color based on model.name
  getColorByItemName(name: string): string {
    switch (name.toLowerCase()) {
      case 'mobile':
        return '#ffc228';
      case 'ordinateur':
        return '#5f0066'; // Assuming 'drank' is your custom class or color
      case 'tablette':
        return '#0c8a38';
      case 'indéfini':
        return '#3f4e61';
      default:
        return 'white'; // Default color if none of the above matches
    }
  }
}
