/****************************************************************************
** Meta object code from reading C++ file 'GuiUser.h'
**
** Created by: The Qt Meta Object Compiler version 67 (Qt 5.15.2)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include <memory>
#include "../../../Ui/GuiUser.h"
#include <QtCore/qbytearray.h>
#include <QtCore/qmetatype.h>
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'GuiUser.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 67
#error "This file was generated using the moc from 5.15.2. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
QT_WARNING_PUSH
QT_WARNING_DISABLE_DEPRECATED
struct qt_meta_stringdata_GuiUser_t {
    QByteArrayData data[15];
    char stringdata0[139];
};
#define QT_MOC_LITERAL(idx, ofs, len) \
    Q_STATIC_BYTE_ARRAY_DATA_HEADER_INITIALIZER_WITH_OFFSET(len, \
    qptrdiff(offsetof(qt_meta_stringdata_GuiUser_t, stringdata0) + ofs \
        - idx * sizeof(QByteArrayData)) \
    )
static const qt_meta_stringdata_GuiUser_t qt_meta_stringdata_GuiUser = {
    {
QT_MOC_LITERAL(0, 0, 7), // "GuiUser"
QT_MOC_LITERAL(1, 8, 9), // "add_watch"
QT_MOC_LITERAL(2, 18, 0), // ""
QT_MOC_LITERAL(3, 19, 9), // "Tutorial&"
QT_MOC_LITERAL(4, 29, 1), // "t"
QT_MOC_LITERAL(5, 31, 15), // "delete_tutorial"
QT_MOC_LITERAL(6, 47, 15), // "print_watchlist"
QT_MOC_LITERAL(7, 63, 15), // "print_tutorials"
QT_MOC_LITERAL(8, 79, 13), // "tutorial_menu"
QT_MOC_LITERAL(9, 93, 8), // "get_next"
QT_MOC_LITERAL(10, 102, 4), // "int&"
QT_MOC_LITERAL(11, 107, 3), // "ind"
QT_MOC_LITERAL(12, 111, 4), // "size"
QT_MOC_LITERAL(13, 116, 10), // "save_watch"
QT_MOC_LITERAL(14, 127, 11) // "print_watch"

    },
    "GuiUser\0add_watch\0\0Tutorial&\0t\0"
    "delete_tutorial\0print_watchlist\0"
    "print_tutorials\0tutorial_menu\0get_next\0"
    "int&\0ind\0size\0save_watch\0print_watch"
};
#undef QT_MOC_LITERAL

static const uint qt_meta_data_GuiUser[] = {

 // content:
       8,       // revision
       0,       // classname
       0,    0, // classinfo
       8,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // slots: name, argc, parameters, tag, flags
       1,    1,   54,    2, 0x08 /* Private */,
       5,    0,   57,    2, 0x08 /* Private */,
       6,    0,   58,    2, 0x08 /* Private */,
       7,    0,   59,    2, 0x08 /* Private */,
       8,    0,   60,    2, 0x08 /* Private */,
       9,    2,   61,    2, 0x08 /* Private */,
      13,    0,   66,    2, 0x08 /* Private */,
      14,    0,   67,    2, 0x08 /* Private */,

 // slots: parameters
    QMetaType::Void, 0x80000000 | 3,    4,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void, 0x80000000 | 10, QMetaType::Int,   11,   12,
    QMetaType::Void,
    QMetaType::Void,

       0        // eod
};

void GuiUser::qt_static_metacall(QObject *_o, QMetaObject::Call _c, int _id, void **_a)
{
    if (_c == QMetaObject::InvokeMetaMethod) {
        auto *_t = static_cast<GuiUser *>(_o);
        Q_UNUSED(_t)
        switch (_id) {
        case 0: _t->add_watch((*reinterpret_cast< Tutorial(*)>(_a[1]))); break;
        case 1: _t->delete_tutorial(); break;
        case 2: _t->print_watchlist(); break;
        case 3: _t->print_tutorials(); break;
        case 4: _t->tutorial_menu(); break;
        case 5: _t->get_next((*reinterpret_cast< int(*)>(_a[1])),(*reinterpret_cast< int(*)>(_a[2]))); break;
        case 6: _t->save_watch(); break;
        case 7: _t->print_watch(); break;
        default: ;
        }
    }
}

QT_INIT_METAOBJECT const QMetaObject GuiUser::staticMetaObject = { {
    QMetaObject::SuperData::link<QObject::staticMetaObject>(),
    qt_meta_stringdata_GuiUser.data,
    qt_meta_data_GuiUser,
    qt_static_metacall,
    nullptr,
    nullptr
} };


const QMetaObject *GuiUser::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->dynamicMetaObject() : &staticMetaObject;
}

void *GuiUser::qt_metacast(const char *_clname)
{
    if (!_clname) return nullptr;
    if (!strcmp(_clname, qt_meta_stringdata_GuiUser.stringdata0))
        return static_cast<void*>(this);
    return QObject::qt_metacast(_clname);
}

int GuiUser::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QObject::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        if (_id < 8)
            qt_static_metacall(this, _c, _id, _a);
        _id -= 8;
    } else if (_c == QMetaObject::RegisterMethodArgumentMetaType) {
        if (_id < 8)
            *reinterpret_cast<int*>(_a[0]) = -1;
        _id -= 8;
    }
    return _id;
}
QT_WARNING_POP
QT_END_MOC_NAMESPACE
