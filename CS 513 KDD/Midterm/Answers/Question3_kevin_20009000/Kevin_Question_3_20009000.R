# CS 513 -KDD  
# Midterm Question 3

# Course      : CS 513
# First Name  : Kevin
# Last Name   : Dsa
# CWID        : 20009000


rm(list = ls())

# Loading CSV 
Data <- read.csv('/Users/kevindsa/Documents/IBM_Attrition_v3B.csv',header=TRUE, sep=",")
summary(Data)
View(Data)

# From summary, missing values (NA) exist only in MonthlyIncome
# Creating a function to calculate mode of the column
getMode <- function(v) {
  uniqv <- na.omit(unique(v))
  uniqv[which.max(tabulate(match(v, uniqv)))]
}

# Replacing NA of the column with mode of the column
monthlyIncomeMode = getMode(Data$MonthlyIncome)

Data$MonthlyIncome[is.na(Data$MonthlyIncome)] <- monthlyIncomeMode

View(Data)



# Scatter plot 
scatterPlotData = data.frame(Data$Age,Data$MonthlyIncome,Data$YearsAtCompany)
plot(scatterPlotData,main="Scatter plot of Age, Monthly Income and Years At Company",col="green")

# box plot
boxPlotData = data.frame(Data$Age,Data$MonthlyIncome,Data$YearsAtCompany)
boxplot(boxPlotData,main="box plots for columns: Age, Monthly Income and Years At Company",col="green")

rm(list = ls())``
