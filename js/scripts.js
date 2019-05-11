let repository = [];

repository.push({
    name: 'Birobirio',
    height: 80,
    types: ['dust', 'wind', 'cacti']
});

repository.push({
    name: 'Chipozard',
    height: 2,
    types: ['bird', 'hooves', 'scales']
});

repository.push({
    name: 'Drikka',
    height: 12,
    types: ['fur', 'electricity', 'teeth']
});

document.write("<ul>");
for (let i = 0; i < repository.length; i++) {
    let comment = " - Normal";
    if (repository[i].height < 5) comment = " - very small.";
    if (repository[i].height > 50) comment = " - Wow, that's tall!";

    document.write('<li><h2>' + repository[i].name + '</h2><span class="declaration">(height: ' + repository[i].height + comment + ')</span></li>');
}
document.write("</ul>");