//
// Created by Tavi on 17.05.2021.
//

#include <unordered_map>
#include "PieSliceChart.h"
#include <QtCharts/QBarSeries>
#include <QtCharts/QBarSet>
#include <QtCharts/QChart>
#include <QChartView>


QT_CHARTS_USE_NAMESPACE

PieSliceChart::PieSliceChart(Repo &repo):repo(repo) {

}

void PieSliceChart::run_app() {

    std::vector<Tutorial>v=repo.get_all();


    QBarSeries *series=new QBarSeries;
    for(int i=0;i<v.size();i++)
    {
        QBarSet *bar=new QBarSet(QString::fromStdString(v[i].get_presenter()));
        *bar<<v[i].get_likes();
        series->append(bar);

    }

    QChart *chart=new QChart;
    chart->addSeries(series);
    chart->setTitle("Chart with tutorials ");
    chart->setAnimationOptions(QChart::AllAnimations);
    QChartView *chartView=new QChartView(chart);
    chartView->resize(1200,500);
    chartView->show();

}
