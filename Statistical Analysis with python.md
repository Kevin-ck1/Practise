## Statistical Analysis with python

There are three different analysis techniques;

1. Univariate analysis
2. Bivariate analysis
3. Multivariate analysis 



### Univariate analysis

* The data analyzed contains only one variable,  e,g the number of boys and girls in a classroom
* It is conducted through methods that are descriptive in nature, i.e *frequency distribution tables, histograms, pie charts, bar charts, box plots measures of central tendency(mean, median &mode), measure of dispersion (variance, range, IQR, Standard deviation)* 

#### Frequency Tables

A frequency table is a chart that summarizes values and their frequency across a given variables,

```python
credit_df['Sex'].value_counts()
```

#### Bar Charts

```pyth
credit_df['Saving accounts'].value_counts().plot(kind='bar');
```

#### Histograms

```python
plt.hist(credit_df['Duration'], bins=10, histtype='bar', rwidth=0.9);
```

#### Pie Charts

```python
checking_account = credit_df['Checking account'].value_counts()

labels = checking_account.index.tolist()

plt.pie(checking_account , labels=labels, shadow=True, startangle=140, autopct='%i%%');
```



#### Box Plot

A box plot is used in explanatory data analysis to visually show the distribution of numerical data and skewness through displaying the data quartiles (or percentiles) and averages.

It can tell us whether our variable contains outliers. 

```python
sns.boxplot(credit_df["Duration"], showmeans=True);

#To display the numerical values of box plot
credit_df['Duration'].describe()
```

#### Measures of Central Tendency

**Mean** is the the average of the values in a variable.

**Median** is the middle value given a variable.

The **mode** is the value that occurs the most frequently in your data set.

```python
#Mean
mean_age = credit_df['Age'].mean()

#Median
median_age = credit_df['Age'].median()

#Mode
mode_age = credit_df['Age'].mode().iloc[0]

```



#### Measures of dispersion 

 **Variance** is a measurement of the spread between numbers in a data set. It measures how far each number in the set is from the mean

**Standard deviation** measures the dispersion of a dataset relative to its mean and is calculated as the square root of the variance. If the data points are further from the mean, there is a higher deviation within the data set; thus, the more spread out the data, the higher the standard deviation.

**Range** is the difference between the minimum and maximum values in a variable

**Quartiles **are used to calculate the interquartile range, which is a measure of variability around the median. 

**Skewness** is a measure of symmetry, or more precisely, the lack of symmetry. A negatively skewed distribution has a negative value while a positive value means the distribution is positively skewed.

**Kurtosis** is a statistical measure used to describe the degree to which scores cluster in the tails or the peak of a frequency distribution.

* Positive values of kurtosis indicate that a distribution is peaked and possess thick tails; leptokurtic distribution.

*  Negative values of kurtosis indicate that a distribution is flat and has thin tails; platykurtic distribution.

* If the kurtosis is close to 0, then a normal distribution is often assumed; mesokurtic distribution.

```python
#Variance
credit_df["Credit amount"].var()

#Standard Deviation
credit_df["Credit amount"].std()

#Range
credit_df_max = credit_df["Credit amount"].max()
credit_df_min = credit_df["Credit amount"].min()

# Calculating the range
credit_df_max - credit_df_min

#Quartiles
credit_df["Credit amount"].quantile([0.25, 0.5, 0.75])

#Skewness
credit_df["Credit amount"].skew()

#Kurtosis
credit_df["Credit amount"].kurt()

#Sumarry of statistics
credit_df['Credit amount'].describe()
```



#### Query

We can also query our dataframe to see the records in which the credit_df is equal to 27

```python
credit_df.query('Age==27')
```



### Bivariate analysis

* It is carried out to find out if their is a relationship between two variables. e.g to determine the relationship between temperature and coat sales in a year.

* It can be conducted through, *scatter plots, line charts, correlation coefficients,  regression analysis*
  * **correlation** -- it is a technique where the strength of the relationship between two variables is observed.
  * Correlation coefficients are rated on a scale of -1 to 1, where 1 is a perfect direct correlation and -1 is a perfect inverse correlation, and 0 there is no correlation.
  * **regression analysis** -- 

#### Scatter Plots

A scatter plot reveals relationships or association between two variables.

If the markers are close to making a straight line in the scatter plot, the two variables have a high correlation.

If the markers are equally distributed in the scatter plot, the correlation is low, or zero.

```python
startup_df.plot.scatter(x='R&D Spend', y='Profit') 
plt.title('R&D Spend vs Profit') 
plt.show()
```



#### Pearson Correlation Coefficient

A few things to note while working with correlation coefficients: 

* A correlation coefficient > 0.5 means that the two variables have a strong positive correlation. 
* A correlation coefficient < 0.5 means that the two variables have a weak positive correlation. 
* A correlation coefficient of 0 means that the two variables are not correlated at all. 
* A correlation coefficient between -0.5 and 0 means that the two variables have weak negative correlation. 
* A correlation coefficient between -1 and -0.5 means that the two variables have strong negative correlation.

```python
#To get the pearson correlation coefficient for R&D Spend and marketing spend:
pearson_coeff = startup_df["R&D Spend"].corr(startup_df["Marketing Spend"], 							method="pearson") 
pearson_coeff

#To get the correlatation of all variables in the dataset
startup_df.corr()

#Using a Heat Map to Visualize the correlation
sns.heatmap(startup_df.corr(), annot=True, vmin=-1, vmax=1);
```



#### Line Graph

Used to observe the relationship between two variables.

```python
candy2016_plus_df.plot.line(x='observation_date', y='IPG3113N', );
```



### Multivariate analysis

* Is used when there are more than two variables in the data set.
* Methods used
  	* Factor analysis
  	* Cluster analysis
  	* Discriminant analysis
  	* Multidimensional Scaling











