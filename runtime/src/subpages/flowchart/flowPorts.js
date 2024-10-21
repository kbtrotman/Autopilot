

export const startEndPorts = {
    items: [
      { id: 'start_in', group: 'in' },  // input port
      { id: 'start_out', group: 'out' }, // output port
    ],
    groups: {
      'in': {
        position: 'top',
        anchor: 'center',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: 'black',
            strokeWidth: 2,
            fill: '#ffffff',
            width: 16,
            height: 16,
            x: -8,
            y: 0,
          },
        },
      },
      'out': {
        position: 'bottom',
        anchor: 'center',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: 'black',
            strokeWidth: 2,
            fill: '#ffffff',
            width: 16,
            height: 16,
            x: -8,
            y: 0,
          },
        },
      },
    },
  };

  export const pointPorts = {
    items: [
      { id: 'point_in', group: 'in' },  // input port
      { id: 'point_ch1', group: 'out1' }, // output port
      { id: 'point_ch2', group: 'out2' }, // output port
      { id: 'default', group: 'default' }, // output port
    ],
    groups: {
      'in': {
        position: 'top',
        anchor: 'center',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: 'black',
            strokeWidth: 2,
            fill: '#ffffff',
            width: 16,
            height: 16,
            x: -8,
            y: 0,
          },
        },
      },
      'out1': {
        position: 'left',
        anchor: 'center',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: 'black',
            strokeWidth: 2,
            fill: '#ffffff',
            width: 16,
            height: 16,
            x: -8,
            y: 0,
          },
        },
      },
      'out2': {
        position: 'right',
        anchor: 'center',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: 'black',
            strokeWidth: 2,
            fill: '#ffffff',
            width: 16,
            height: 16,
            x: -8,
            y: 0,
          },
        },
      },
      'default': {
        position: 'bottom',
        anchor: 'center',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: 'black',
            strokeWidth: 2,
            fill: '#ffffff',
            width: 16,
            height: 16,
            x: -8,
            y: 0,
          },
        },
      },
    },
  };
  
  export const inputOutputPorts = {
    items: [
      { id: 'io_in', group: 'in' },  // input port
      { id: 'io_out', group: 'out' }, // output port
    ],
    groups: {
      'in': {
        position: 'top',
        anchor: 'center',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: 'black',
            strokeWidth: 2,
            fill: '#ffffff',
            width: 16,
            height: 16,
            x: -8,
            y: 0,
          },
        },
      },
      'out': {
        position: 'bottom',
        anchor: 'center',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: 'black',
            strokeWidth: 2,
            fill: '#ffffff',
            width: 16,
            height: 16,
            x: -8,
            y: 0,
          },
        },
      },
    },
  };

  export const formPorts = {
    items: [
      { id: 'metric_in', group: 'in' },   // custom input port
      { id: 'metric_out', group: 'out' }, // custom output port
    ],
    groups: {
      'in': {
        position: 'top',
        anchor: 'center',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: 'black',
            strokeWidth: 2,
            fill: '#ffffff',
            width: 16,
            height: 16,
            x: -8,
            y: 0,
          },
        },
      },
      'out': {
        position: 'bottom',
        anchor: 'center',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: 'black',
            strokeWidth: 2,
            fill: '#ffffff',
            width: 16,
            height: 16,
            x: -8,
            y: 0,
          },
        },
      },
    },
  };

  export const metricPorts = {
    items: [
      { id: 'metric_in', group: 'in' },   // custom input port
      { id: 'metric_out', group: 'out' }, // custom output port
    ],
    groups: {
      'in': {
        position: 'top',
        anchor: 'center',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: 'black',
            strokeWidth: 2,
            fill: '#ffffff',
            width: 16,
            height: 16,
            x: -8,
            y: 0,
          },
        },
      },
      'out': {
        position: 'bottom',
        anchor: 'center',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: 'black',
            strokeWidth: 2,
            fill: '#ffffff',
            width: 16,
            height: 16,
            x: -8,
            y: 0,
          },
        },
      },
    },
  };

  export const taskPorts = {
    items: [
      { id: 'task_in', group: 'in' },   // custom input port
      { id: 'task_out', group: 'out' }, // custom output port
    ],
    groups: {
      'in': {
        position: 'top',
        anchor: 'center',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: 'black',
            strokeWidth: 2,
            fill: '#ffffff',
            width: 16,
            height: 16,
            x: -8,
            y: 0,
          },
        },
      },
      'out': {
        position: 'bottom',
        anchor: 'center',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: 'black',
            strokeWidth: 2,
            fill: '#ffffff',
            width: 16,
            height: 16,
            x: -8,
            y: 0,
          },
        },
      },
    },
  };

  export const scriptPorts = {
    items: [
      { id: 'script_in', group: 'in' },   // custom input port
      { id: 'script_out', group: 'out' }, // custom output port
    ],
    groups: {
      'in': {
        position: 'top',
        anchor: 'center',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: 'black',
            strokeWidth: 2,
            fill: '#ffffff',
            width: 16,
            height: 16,
            x: -8,
            y: 0,
          },
        },
      },
      'out': {
        position: 'bottom',
        anchor: 'center',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: 'black',
            strokeWidth: 2,
            fill: '#ffffff',
            width: 16,
            height: 16,
            x: -8,
            y: 0,
          },
        },
      },
    },
  };
  