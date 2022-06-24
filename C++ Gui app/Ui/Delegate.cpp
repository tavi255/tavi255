#include <QStylePainter>
#include "Delegate.h"

Delegate::Delegate(vector<Tutorial>v,QObject *parent) : QItemDelegate(parent),v(v) {

}

void Delegate::paint(QPainter *painter, const QStyleOptionViewItem &option, const QModelIndex &index) const {

    QStyleOptionButton button;
    button.icon=QIcon("D:\\github\\a10-tavi255-1\\play.png");
    button.iconSize=QSize(30,30);
    button.state=QStyle:: State_Enabled;
    QRect r= option. rect.adjusted( 1, 1, - 1, - 1);

    int x,y,w,h;
    x = r.left() + r.width() - 130;//the X coordinate
    y = r.top();//the Y coordinate
    w = 130;//button width
    h = 30;//button height
    button.rect = QRect(x,y,w,h);


    QApplication::style()->drawControl( QStyle::CE_PushButton, &button, painter);
}

bool Delegate::editorEvent(QEvent *event, QAbstractItemModel *model, const QStyleOptionViewItem &option,
                           const QModelIndex &index) {

    if( event->type() == QEvent::MouseButtonRelease )
    {
        QMouseEvent * e = (QMouseEvent *)event;
        int clickX = e->x();
        int clickY = e->y();

        QRect r = option. rect.adjusted( 1, 1, - 1, - 1);//getting the rect of the cell
        int x,y,w,h;
        x = r.left() + r.width() - 130;//the X coordinate
        y = r.top();//the Y coordinate
        w = 130;//button width
        h = 30;//button height

        if( clickX > x && clickX < x + w )
            if( clickY > y && clickY < y + h )
            {
                string k="start msedge.exe ";
                k+=v[index.row()].get_link();
                system(k.c_str());
            }
    }

    return true;
}
