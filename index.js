const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");
const sideBarLink = document.querySelectorAll("aside .sidebar ul li");
const graphOptions = document.querySelectorAll('input[type="checkbox"]');
const notification = document.querySelector(".notification");
const release = true; // false

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

hamburger.addEventListener("click", mobileMenu);

navLink.forEach(n => n.addEventListener("click", closeMenu));

for (let li of sideBarLink) {
    li.addEventListener('click', function () {
        for (let li of sideBarLink) {
            li.classList.remove('active');
        }
        this.classList.add('active');
    })
}

if (release) {
    notification.classList.add('active');
}

const originalSeries = [
    {
        name: 'co2',
        points: [
            ['2006', 29.9],
            ['2010', 97.5],
            ['2018', 110.4],
            ['2019', 129.2],
            ['2020', 144.0],
            ['2021', 176.0]
        ]
    },
    {
        name: 'c2h4',
        points: [
            ['2006', 86.9],
            ['2010', 79.5],
            ['2018', 95.4],
            ['2019', 97.2],
            ['2020', 123.0],
            ['2021', 111.0]
        ]
    },
    {
        name: 'n2o',
        points: [
            ['2006', 129.9],
            ['2010', 111.5],
            ['2018', 66.4],
            ['2019', 29.2],
            ['2020', 88.0],
            ['2021', 102.0]
        ]
    },
    {
        name: 'other',
        points: [
            ['2006', 56.9],
            ['2010', 56.5],
            ['2018', 56.4],
            ['2019', 56.2],
            ['2020', 75.0],
            ['2021', 56.0]
        ]
    }
];
let series = [{ ...originalSeries[0] }];
let chart = JSC.chart('chartDiv', {
    debug: false,
    type: 'line',
    legend_visible: false,
    xAxis: {
        crosshair_enabled: true,
        scale: { type: 'time' }
    },
    yAxis: {
        label: {
            text: 'kg emitted',
        },
        // orientation: 'opposite',
        // formatString: 'c'
    },
    defaultSeries: {
        firstPoint_label_text: '<b>%seriesName</b>',
        defaultPoint_marker: {
            type: 'circle',
            size: 8,
            fill: 'white',
            outline: { width: 2, color: 'currentColor' }
        }
    },
    title_label_text: '',
    series: series
});

for (let graphOpt of graphOptions) {
    graphOpt.addEventListener('change', function () {
        if (this.checked) {
            const newOpt = originalSeries.find(opt => opt.name === this.id);
            if (!series.length) {
                series = [newOpt];
            } else {
                if (!series.every(opt => opt.name == newOpt.name)) {
                    series = [...series, newOpt]
                }
            }
            chart = JSC.chart('chartDiv', {
                debug: false,
                type: 'line',
                legend_visible: false,
                xAxis: {
                    crosshair_enabled: true,
                    scale: { type: 'time' }
                },
                yAxis: {
                    label: {
                        text: 'kg emitted',
                    },
                },
                defaultSeries: {
                    firstPoint_label_text: '<b>%seriesName</b>',
                    defaultPoint_marker: {
                        type: 'circle',
                        size: 8,
                        fill: 'white',
                        outline: { width: 2, color: 'currentColor' }
                    }
                },
                title_label_text: '',
                series: series
            });
        } else {
            series = series.filter(opt => opt.name != this.id)
            chart = JSC.chart('chartDiv', {
                debug: false,
                type: 'line',
                legend_visible: false,
                xAxis: {
                    crosshair_enabled: true,
                    scale: { type: 'time' }
                },
                yAxis: {
                    label: {
                        text: 'kg emitted',
                    },
                },
                defaultSeries: {
                    firstPoint_label_text: '<b>%seriesName</b>',
                    defaultPoint_marker: {
                        type: 'circle',
                        size: 8,
                        fill: 'white',
                        outline: { width: 2, color: 'currentColor' }
                    }
                },
                title_label_text: '',
                series: series
            });

        }
    })
}

var pieChart = JSC.Chart('pieChartDiv', {
    debug: false,
    // title_position: 'center',
    legend: {
        template:
            '%value {%percentOfTotal:n1}% %icon %name',
        position: 'inside left bottom'
    },
    defaultSeries: {
        type: 'pie',
        pointSelection: true
    },
    defaultPoint_label_text: '<b>%name</b>',
    // title_label_text: 'Countries GDP',
    yAxis: { label_text: 'GDP', formatString: 'n' },
    series: [
        {
            name: 'Countries',
            points: [
                { name: 'United States', y: 5452500 },
                { name: 'Canada', y: 786052 },
                { name: 'United Kingdom', y: 477338 },
                { name: 'Mexico', y: 155313 }
            ]
        }
    ]
});