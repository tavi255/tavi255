
import pandas as pd
from ast import literal_eval



df = pd.read_csv('D:\\licenta\\FitnessTracker\\FoodRecommandations\\food_data.csv')


# pandas read list type colomns(description) as string, so convert them back to list type
df.description = df.description.apply(literal_eval)


# convert all strings to lower case and remove the spaces
def clean_feature(x):
    if isinstance(x, list):
        # apply for all list items
        return [str.lower(i.replace(" ", "")) for i in x]
    else:
        # apply for string items, if not string return an empty string
        if isinstance(x, str):
            return str.lower(x.replace(" ", ""))
        else:
            return ''


# apply clean function to the features
features = ['description']
for feature in features:
    df[feature] = df[feature].apply(clean_feature)


def add_feature_col(x):
    return ' '.join(x['description'])

df['description'] = df.apply(add_feature_col, axis=1)
df['description'].head(5)



from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity


features=['protein','carbohydrate','fat','calories']

# create count matrix and cosine similarity
count = CountVectorizer(stop_words='english')
count_matrix = count.fit_transform(df['description'])


cosine_sim1=cosine_similarity(df[features],df[features])
cosine_sim2=cosine_similarity(count_matrix,count_matrix)

cosine_sim=(cosine_sim1+cosine_sim2)/2


# reset index of the data frame and construct reverse mapping
df = df.reset_index()
indices = pd.Series(df.index, index=df['name'])



def get_recommendations(name, cosine_sim):
    # get the index of the food that matches the title

    if name not in indices:
        return []
    idx = indices[name]


    # get the pairwsie similarity scores of all foods with that food
    sim_scores = list(enumerate(cosine_sim[idx]))



    # sort the foods based on the similarity scores
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # get the scores of the 2 most similar foods
    sim_scores = sim_scores[1:3]

    # get the foods indices
    food_indices = [i[0] for i in sim_scores]

    ls=[]
    # return the top 10 most similar foods from the data frame
    names=df['name'].iloc[food_indices].values
    protein = df['protein'].iloc[food_indices].values
    carbohydrate = df['carbohydrate'].iloc[food_indices].values
    fat = df['fat'].iloc[food_indices].values
    calories = df['calories'].iloc[food_indices].values

    for i in range(len(names)):
        food={}
        food['description']=names[i]
        food['protein']=int(protein[i])
        food['carbohydrate']=int(carbohydrate[i])
        food['fat']=int(fat[i])
        food['calories']=int(calories[i])
        ls.append(food)

    return ls

def get_recommendations2(name):
    return get_recommendations(name,cosine_sim)





