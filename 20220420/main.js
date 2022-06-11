const svg = d3.select('body').
append('svg').attr('width',1000).attr('height',750);



const height_1 = svg.append('g').attr('transform','translate(100,100)');

height_1.append('line').attr('x1', 0).attr('x2', 829.8).style('stroke', '#00B2A4');
height_1.style('stroke-width','10');
height_1.append('circle').attr('cx', 829.8).attr('cy', 0).attr('r', 10).style('stroke', '#00B2A4');
//height_1.append('circle').attr('cx',829.8).attr('cy',0).attr('r',3);
height_1.append('text').attr('x',0).attr('y',35).text("哈里發塔 829.8m");


const height_2 = svg.append('g').attr('transform', 'translate(100,200)');
height_2.style('stroke-width', '10');
height_2.append('line').attr('x1', 0).attr('x2', 679).style('stroke', '#81D8D0');
height_2.append('circle').attr('cx', 679).attr('cy', 0).attr('r', 10).style('stroke', '#81D8D0');
height_2.append('text').attr('x', 0).attr('y', 35).text("莫狄卡118 679m");


const height_3 = svg.append('g').attr('transform', 'translate(100,300)');
height_3.style('stroke-width', '10');
height_3.append('line').attr('x1', 0).attr('x2', 632).style('stroke', '#00B28C');
height_3.append('circle').attr('cx', 632).attr('cy', 0).attr('r', 10).style('stroke', '#00B28C');
height_3.append('text').attr('x', 0).attr('y', 35).text("上海中心大廈 632m");


const height_4 = svg.append('g').attr('transform', 'translate(100,400)');
height_4.style('stroke-width', '10');
height_4.append('line').attr('x1', 0).attr('x2', 601).style('stroke', '#008081');
height_4.append('circle').attr('cx', 601).attr('cy', 0).attr('r', 10).style('stroke', '#008081');
height_4.append('text').attr('x', 0).attr('y', 35).text("麥加黃金鐘塔 601m");


const height_5 = svg.append('g').attr('transform', 'translate(100,500)');
height_5.style('stroke-width', '10');
height_5.append('line').attr('x1', 0).attr('x2', 555).style('stroke', '#00D6CF');
height_5.append('circle').attr('cx', 555).attr('cy', 0).attr('r', 10).style('stroke', '#00D6CF');
height_5.append('text').attr('x', 0).attr('y', 35).text("樂天世界大廈 555m");


/**/
