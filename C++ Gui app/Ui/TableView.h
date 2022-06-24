//
// Created by Tavi on 29.05.2021.
//

#ifndef A45_TAVI255_TABLEVIEW_H
#define A45_TAVI255_TABLEVIEW_H


#include <QAbstractTableModel>
#include "../entity/Tutorial.h"
#include <vector>
class TableView: public QAbstractTableModel{

private:
    std::vector<Tutorial> v;
public:
    TableView(std::vector<Tutorial> &v);

    int rowCount(const QModelIndex &parent = QModelIndex()) const override;
    int columnCount(const QModelIndex &parent = QModelIndex()) const override;
    QVariant data(const QModelIndex &index, int role = Qt::DisplayRole) const override;

};





#endif //A45_TAVI255_TABLEVIEW_H
