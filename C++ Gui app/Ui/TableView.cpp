//
// Created by Tavi on 29.05.2021.
//

#include "TableView.h"

TableView::TableView(std::vector<Tutorial> &v):v(v) {

}

int TableView::rowCount(const QModelIndex &parent) const {
    return v.size();
}

int TableView::columnCount(const QModelIndex &parent) const {
    return 6;
}

QVariant TableView::data(const QModelIndex &index, int role) const {

    int row=index.row();
    int col=index.column();

    if(role==Qt::DisplayRole) {

        if (col == 0) return QString::fromStdString(v[row].get_title());
        if (col == 1) return QString::fromStdString(v[row].get_presenter());
        if (col == 2) return QString::fromStdString(v[row].get_duration());
        if (col == 3) return QString::fromStdString(std::to_string(v[row].get_likes()));
        if (col == 4) return QString::fromStdString(v[row].get_link());
    }


    return QVariant();
}
