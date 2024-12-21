const { Article } = require('./Article.js');
const { Admin } = require('./Admin.js');
const { Client } = require('./Client.js');
const { Commande } = require('./Commande.js');
const { CommandeDetail } = require('./CommadeDetails.js');

// Relations
Client.hasMany(Commande, { foreignKey: 'clientId' });
Commande.belongsTo(Client, { foreignKey: 'clientId' });

// Commande.belongsToMany(Article, { through: 'CommandeDetail' });
// Article.belongsToMany(Commande, { through: 'CommandeDetail' });



//Relation de Commande et CommandeDetails
Commande.hasMany(CommandeDetail, {
    foreignKey: 'commandeId',
    as: 'details'
});
CommandeDetail.belongsTo(Commande, {
    foreignKey: 'commandeId',
    as: 'commande'
});






//Relation d' Article et CommandeDetails
Article.hasMany(CommandeDetail, {
    foreignKey: 'articleId',
    as: 'details'
});
CommandeDetail.belongsTo(Article, {
    foreignKey: 'articleId',
    as: 'article'
});
//Relation entre Client et Commande
Commande.belongsTo(Client, {
    as: 'client',
    foreignKey: 'clientId'
});
Client.hasMany(Commande, {
    as: 'commandes',
    foreignKey: 'clientId'
});



// Categorie.hasMany(Categorie, { foreignKey: 'parent_id' });    