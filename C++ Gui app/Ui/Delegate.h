//
// Created by Tavi on 31.05.2021.
//

#ifndef A45_TAVI255_DELEGATE_H
#define A45_TAVI255_DELEGATE_H



#include <QPushButton>
#include <QTableView>
#include <QPainter>
#include <QItemDelegate>
#include <QEvent>
#include <QMouseEvent>
#include <QDialog>
#include <QApplication>
#include "../entity/Tutorial.h"
#include <vector>

using namespace std;

class Delegate: public QItemDelegate {

private:

    vector<Tutorial>v;

public:

    explicit Delegate(vector<Tutorial>v,QObject *parent=0);

    void paint(QPainter *painter, const QStyleOptionViewItem &option, const QModelIndex &index) const;
    bool editorEvent(QEvent *event, QAbstractItemModel *model, const QStyleOptionViewItem &option, const QModelIndex &index);
};




#endif //A45_TAVI255_DELEGATE_H
