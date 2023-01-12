# CS 513 -KDD  
# Home Work 2 - EDA

# Course      : CS 513
# First Name  : Kevin
# Last Name   : Dsa
# CWID        : 20009000

rm(list = ls())

# Load and summarize
csvFile <-file.choose()
cancerData <- read.csv(csvFile)
summary(cancerData)
View(cancerData)

# From summary, missing values (NA) exist only in column F6 as "?"
# converting "?" to NA
cancerData[cancerData == '?'] <- NA
View(cancerData)

# converting data frame F6 column to integer
cancerData$F6 <- as.integer(cancerData$F6)
summary(cancerData)

# sum of F6 without NA values
sumF6 = sum(cancerData$F6, na.rm = TRUE)
sumF6

# set the mean of the column as the replacement values of NA
cancerData$F6[is.na(cancerData$F6)] <- round(sumF6 / sum(!is.na(cancerData$F6)))
summary(cancerData)


# Display the frequency table of Class vs F6
ftable(cancerData$Class,cancerData$F6)

par(mar=c(1,1,1,1))
par("mar")

# scatter plot of F1 to F6, one pair at a time
pairs(cancerData[2:7],main = "Scatter plot of F1-F6, for each pair",
      pch = 21,bg =c("green","blue")[factor(cancerData$Class)])

# box plot for columns F7 to F9   
boxplot(cancerData[8:10],main="F7 to F9 : histogram box plot",col="yellow")


# Remove all environment variables for reloading
rm(list = ls())

# Question 2

# Load and summarize
csvFile <-file.choose()
cancerData <- read.csv(csvFile)
summary(cancerData)
View(cancerData)

# From summary, missing values (NA) exist only in column F6 as "?"
# converting "?" to NA
cancerData[cancerData == '?'] <- NA
View(cancerData)

# converting data frame F6 column to integer
cancerData$F6 <- as.integer(cancerData$F6)
summary(cancerData)

# Removing all the columns with NA
cancerData <- na.omit(cancerData)

# Viewing the final data set
View(cancerData)
summary(cancerData)
