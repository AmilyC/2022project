//Data utilities
const parseNA = string =>(string==='NA'? undefined:string);
//如果是NA就把它變成undefined
const parseDate = string =>d3.timeParse("%Y-%m-%d")(string);
//希望是日期時間的格式
//timeparse return value is a function, string go into the function

/*
budget: "42150098"
genre: "Animation"
genres: "[{\"id\": 16, \"name\": \"Animation\"}, {\"id\": 35, \"name\": \"Comedy\"}, {\"id\": 10751, \"name\": \"Family\"}]"
homepage: "http://toystory.disney.com/toy-story"
id: "862"
imdb_id: "tt0114709"
original_language: "en"
overview: "Led by Woody, Andy's toys live happily in his room until Andy's birthday brings Buzz Lightyear onto the scene. Afraid of losing his place in Andy's heart, Woody plots against Buzz. But when circumstances separate Buzz and Woody from their owner, the duo eventually learns to put aside their differences."
popularity: "21.946943"
poster_path: "/rhIRbceoE9lR4veEXuwCC2wARtG.jpg"
production_countries: "[{\"iso_3166_1\": \"US\", \"name\": \"United States of America\"}]"
release_date: "1995-10-30"
revenue: "524844632"
runtime: "81"
status: "Released"
tagline: "NA"
title: "Toy Story"
video: "FALSE"
vote_average: "7.7"
vote_count: "5415"

*/

function type(d){
    const date = parseDate(d.release_date);
    return{
        budget: +d.budget,
        genre: parseNA(d.genre),
        genres: JSON.parse(d.genres).map(d=>d.name),
        homepage: parseNA(d.homepage),
        id: +d.id,
        imdb_id: parseNA(d.imdb_id),
        original_language: parseNA(d.original_language),
        overview: parseNA(d.overview),
        popularity: +d.popularity,
        poster_path: parseNA(d.poster_path),
        production_countries: JSON.parse(d.production_countries),
        release_date: date,
        release_year: date.getFullYear(),
        revenue: +d.revenue,
        runtime: +d.runtime,
        tagline: parseNA(d.tagline),
        title: parseNA(d.title),
        vote_average: +d.vote_average,
        vote_count: +d.vote_count,
    }
    
}


//Data selection
function filterData(data){
    return data.filter(
        d=>{
            return(
                //抓1999-2010的資料，過濾不必要的資料
                d.release_year>1999 
                && d.release_year<2010
                &&d.revenue>0 &&
                 d.budget>0&&
                d.genre &&
                d.title
            );
        }
    )
}



//Load Data 
d3.csv('data/movies.csv',type).then(
    res=>{
        ready(res);
        //console.log(res);
    }
)

function prepareBarCharData(data){
    console.log(data);
    const dataMap = d3.rollup(
        data,
        v=> d3.sum(v,leaf =>leaf.revenue),//將revenue 加總
        d => d.genre// group by movie 
    
    );    
    const dataArray = Array.from(dataMap, d=>({genre:d[0],
    revenue:d[1]}));

    return dataArray;
}

function setupCanvas(barCharData){
    const svg_width = 400;
    const svg_height = 500;
    const chart_margin = {top:80, right:40, bottom:40, left:80};
    const chart_width = svg_width -(chart_margin.left +chart_margin.right);
    const chart_height = svg_height - (chart_margin.top +chart_margin.bottom);

    const this_svg = d3.select('.bar-chart-container').append('svg')
    .attr('width', svg_width).attr('height',svg_height)
    .append('g')
    .attr('transform' , `translate(${chart_margin.left},${chart_margin.top})`);

    //scale
    //v1.d3.extent fing the max & min in revenue//domain 放資料 range 放圖
    const xExtent = d3.extent(barCharData, d=>d.revenue);
    const xScale_v1 = d3.scaleLinear().domain(xExtent).range([0,chart_width]);
    //v2.0 ~max
    const xMax = d3.max(barCharData,d=>d.revenue);//抓資料裡面的revenue
    const xScale_v2 = d3.scaleLinear().domain([0,xMax]).range([0,chart_width]);
    //v3.short writing for v2
    const xScale_v3 = d3.scaleLinear([0,xMax],[0,chart_width]);

    const yScale = d3.scaleBand().domain(barCharData.map(d=>d.genre))
    .rangeRound([0,chart_height])
    .paddingInner(0.25);//bar and bar 之間的間隔


    //Draw bars
    const bars = this_svg.selectAll('.bar')
        .data(barCharData)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', 0)
        .attr('y', d => yScale(d.genre))
        .attr('width', d => xScale_v3(d.revenue))
        .attr('height', yScale.bandwidth())
        .style('fill', 'dodgerblue')

    //Draw header
    const header = this_svg.append('g').attr('class','bar-header')
        .attr('transform', `translate(0,${-chart_margin.top/2})`)//決定header 位置
    .append('text');

    header.append('tspan').text('Total revenue by genre in $US');
    header.append('tspan').text('Years:2000-2009')
    .attr('x', 0).attr('y',20).style('font-size', '0.8em').style('fill','#555');//調整位置

    //tickSizeInner : the length of the tick lines
    //tickSizeOuter : the length of the square ends of the domain path
    const xAxis = d3.axisTop(xScale_v3)
    .tickFormat(formatTicks)
    .tickSizeInner(-chart_height)
    .tickSizeOuter(0);//表格外面的線|____|
                                // |__|__|
    const xAxisDraw = this_svg.append('g').attr('class','x axis').call(xAxis);

    const yAxis = d3.axisLeft(yScale).tickSize(0);
    const yAxisDraw = this_svg.append('g')
    .attr('class','y axis')
    .call(yAxis);

    yAxisDraw.selectAll('text').attr('dx','-0.6em');

}


//Main

function ready(movies) {
    const moviesClean = filterData(movies);
    const barCharData = prepareBarCharData(moviesClean).sort(
        (a, b) => {
            return d3.descending(a.revenue, b.revenue);
        }
    )
    const lineChartData = prepareLineChartData(moviesClean);
    console.log(barCharData);
    console.log(lineChartData);
    const scatterData = prepareScatterData(moviesClean);
    console.log(scatterData);
    setupCanvas(barCharData);
    setupCanvasLine(lineChartData);
    setupCanvasScatter(scatterData);
}

function formatTicks(d){
    //~s 省略很多0
    return d3.format('~s')(d)
    .replace('M','mil')
    .replace('G','bil')
    .replace('T','tri')
}

function prepareLineChartData(data) {
    //取得發行年份
    const groupByYear = d => d.release_year;
    //只取出revenue加總
    const sumOfRevenue = values => d3.sum(values, d => d.revenue);
    //依年份加總revenue
    const sumOfRevenueByYear = d3.rollup(data, sumOfRevenue, groupByYear);
    //只取出budget加總
    const sumOfBudget = values => d3.sum(values, d => d.budget);
    //依年份加總budget
    const sumOfBudgetByYear = d3.rollup(data, sumOfBudget, groupByYear);
    //放進array並排序
    const revenueArray = Array.from(sumOfRevenueByYear).sort((a, b) => a[0] - b[0]);
    const budgetArray = Array.from(sumOfBudgetByYear).sort((a, b) => a[0] - b[0]);
    //用年份來產生日期時間格式的資料，作為後續繪圖的X軸
    const parseYear = d3.timeParse('%Y');
    const dates = revenueArray.map(d => parseYear(d[0]));
    //找出最大值(把各年份的revenue與各年份的budget都先放在一起)
    const revenueAndBudgetArray = revenueArray.map(d => d[1]).concat(budgetArray.map(d => d[1]));
    const yMax = d3.max(revenueAndBudgetArray);

    //最終資料回傳
    const lineData = {
        series: [
            {
                name: 'Revenue',
                color: 'dodgerblue',
                values: revenueArray.map(d => ({ date: parseYear(d[0]), value: d[1] }))
            },
            {
                name: 'Budget',
                color: 'darkorange',
                values: budgetArray.map(d => ({ date: parseYear(d[0]), value: d[1] }))
            }
        ],
        dates: dates,
        yMax: yMax
    }
    return lineData;
}

function setupCanvasLine(lineChartData){
    const svg_width = 500;
    const svg_height = 500;
    const chart_margin = { top: 80, right: 60, bottom: 40, left: 80 };
    const chart_width = svg_width - (chart_margin.left + chart_margin.right);
    const chart_height = svg_height - (chart_margin.top + chart_margin.bottom);
    const this_svg = d3.select('.line-chart-container').append('svg')
        .attr('width', svg_width).attr('height', svg_height)
        .append('g')
        .attr('transform', `translate(${chart_margin.left},${chart_margin.top})`);
    //scale
    //用時間來做X軸
    const xExtent = d3.extent(lineChartData.dates);
    const xScale = d3.scaleTime().domain(xExtent).range([0, chart_width]);
    //垂直空間的分配 - 平均分布給各種類
    const yScale = d3.scaleLinear().domain([0, lineChartData.yMax]).range([chart_height, 0]);

    //line generator
    const lineGen = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.value));
    //Draw Line
    const chartGroup = this_svg.append('g').attr('class', 'line-chart');
    chartGroup.selectAll('.line-series').data(lineChartData.series).enter()
        .append('path')
        .attr('class', d => `line-series ${d.name.toLowerCase()}`)
        .attr('d', d => lineGen(d.values))
        .style('fill', 'none').style('stroke', d => d.color);

    //Draw X axis
    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
    this_svg.append('g').attr('class', 'x axis')
        .attr('transform', `translate(0,${chart_height})`)
        .call(xAxis);
    //Draw Y axis
    const yAxis = d3.axisLeft(yScale).ticks(5).tickFormat(formatTicks)
        .tickSizeInner(-chart_width).tickSizeOuter(0);
    this_svg.append('g').attr('class', 'y axis').call(yAxis);

    //Draw Series Label
    //放在最後一個點的旁邊(x+5,y不變)
    chartGroup.append('g').attr('class', 'series-labels')
        .selectAll('.series-label').data(lineChartData.series).enter()
        .append('text')
        .attr('x', d => xScale(d.values[d.values.length - 1].date) + 5)
        .attr('y', d => yScale(d.values[d.values.length - 1].value))
        .text(d => d.name)
        .style('dominant-baseline', 'central')
        .style('font-size', '0.7em').style('font-weight', 'bold')
        .style('fill', d => d.color);
    //Draw Header - Line
    const header_Line = this_svg.append('g')
        .attr('class', 'bar-header')
        .attr('transform', `translate(0,${-chart_margin.top / 2})`)
        .append('text');
    header_Line.append('tspan').text('Budget and Revenue over time in $US');
    header_Line.append('tspan').text('Films w/ budget and revenue figures, 2000-2009')
        .attr('x', 0)
        .attr('y', 20)
        .style('font-size', '0.8em')
        .style('fill', '#555');

}

//散佈圖
function prepareScatterData(data) {
    return data.sort((a, b) => b.budget - a.budget).filter((d, i) => i < 100);
}

function setupCanvasScatter(scatterData) {
    const svg_width = 500;
    const svg_height = 500;
    const chart_margin = { top: 80, right: 40, bottom: 40, left: 80 };
    const chart_width = svg_width - (chart_margin.left + chart_margin.right);
    const chart_height = svg_height - (chart_margin.top + chart_margin.bottom);

    //Draw Scatter Base
    const this_svg = d3.select('.scatter-plot-container').append('svg')
        .attr('width', svg_width).attr('height', svg_height)
        .append('g')
        .attr('transform', `translate(${chart_margin.left},${chart_margin.top})`);
    //scale
    //d3.extent find the max & min in budget
    const xExtent = d3.extent(scatterData, d => d.budget);
    const xScale = d3.scaleLinear().domain(xExtent).range([0, chart_width]);
    //垂直空間的分配 - 平均分布給各種類
    const yExtent = d3.extent(scatterData, d => d.revenue)
    const yScale = d3.scaleLinear().domain(yExtent).range([chart_height, 0]);

    //Draw Scatters
    this_svg.selectAll('.scatter').data(scatterData).enter()
        .append('circle')
        .attr('class', 'scatter')
        .attr('cx', d => xScale(d.budget))
        .attr('cy', d => yScale(d.revenue))
        .attr('r', 3)
        .style('fill',
            'dodgerblue')
        .style('fill-opacity', 0.5);
    
    //ticks 決定約略有幾個刻度(依數值狀況)
    const xAxis = d3.axisBottom(xScale).ticks(5).tickFormat(formatTicks)
        .tickSizeInner(-chart_height).tickSizeOuter(0);
    const xAxisDraw = this_svg.append('g').attr('class', 'x scatter')
        .attr('transform', `translate(-10,${chart_height + 10})`)
        .call(xAxis)
        .call(addLabel, 'Budget', 25, 0);
    //拉開字與軸的距離
    xAxisDraw.selectAll('text').attr('dy', '2em');

    const yAxis = d3.axisLeft(yScale).ticks(5).tickFormat(formatTicks)
        .tickSizeInner(-chart_height).tickSizeOuter(0);
    const yAxisDraw = this_svg.append('g').attr('class', 'y axis')
        .attr('transform', `translate(-10,10)`)
        .call(yAxis)
        .call(addLabel, 'Revenue', -30, -30);
    //拉開字與軸的距離
    yAxisDraw.selectAll('text').attr('dx','-2em');

    //Draw header
    const header = this_svg.append('g').attr('class', 'bar-header')
        .attr('transform', `translate(0,${-chart_margin.top / 2})`)
        .append('text');
    header.append('tspan').text('Budget vs. Revenue in $US');
    header.append('tspan').text('Top 100 films by budget, 2000-2009')
        .attr('x', 0).attr('y', 20).style('font-size', '0.8em').style('fill', '#555');
    

}

function addLabel(axis, label, x, y) {
    /* axis 是呼叫者 - 哪一個軸 */
    axis.selectAll('.tick:last-of-type text')
        .clone()
        .text(label)
        .attr('x', x)
        .attr('y', y)
        .style('text-anchor', 'start')
        .style('font-weight', 'bold')
        .style('fill', '#555');
}
