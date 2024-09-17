const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3140;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static('public'))
// Set up SQLite database
const db = new sqlite3.Database(':memory:');

// Create posts table and seed data
db.serialize(() => {
  db.run("CREATE TABLE posts (id INTEGER PRIMARY KEY, name TEXT, profession TEXT, title TEXT, description TEXT, link TEXT, likes INTEGER DEFAULT 0)");

  const stmt = db.prepare("INSERT INTO posts (name, profession, title, description, link) VALUES (?, ?, ?, ?, ?)");

  stmt.run("Claude E. Boyd", "Auburn University | AU · School of Fisheries, Aquaculture and Aquatic Sciences, Phd", "Acidity :In book: Water Quality (pp.215-231)", "From what I've learned, acidity in water bodies with a pH ranging from around 4 to 8.3 is mainly due to carbon dioxide and dissolved humic substances. When the pH drops below 4, it usually indicates the presence of sulfuric acid or another strong acid, though CO2 and humic compounds are still present. This low pH level often means low productivity and biodiversity in the water. To measure acidity, they use titration with standard sodium hydroxide, and it's usually reported in milligrams per liter of calcium carbonate. Low pH levels and high acidity can occur naturally, often due to the oxidation of sulfides in soil or sediment. But human activities like mining and burning fossil fuels also contribute to this acidity in surface waters. Interestingly, while rising atmospheric CO2 levels don't drastically change the pH of rainfall and freshwater bodies, they are leading to ocean acidification, which is harming calcifying organisms. Liming is a common method used to neutralize acidity.", "https://www.researchgate.net/publication/335797110_Acidity");
 
 stmt.run("Frida I Kaihena", "", "Analysis of Clean Water Quality and Quantity for Domestic Needs in Rutong", "From what I've read, hemodialysis patients face a significant risk of healthcare-related infections, particularly when non-sterile water is used to prepare the dialysis fluid. This makes microbiological control and monitoring of the water crucial. In a study conducted in Ahvaz city, Iran, over a six-month period, researchers collected 18 water samples from different points in the hemodialysis water distribution system. They discovered a high number of bacterial colonies on R2A agar, and using 16S rRNA gene sequencing, identified 31 different bacteria with diverse morphological and biochemical traits. Most of the bacteria were Gram-negative bacilli, with Sphingomonas being the most commonly isolated genus. Interestingly, despite the presence of these Gram-negative bacteria, the endotoxin levels in all samples were below the detection limit. The study concluded that bacteria from the Sphingomonas genus, along with Bosea and mycobacteria, are likely early colonizers that form biofilms on surfaces. These, along with other bacteria like Pelomonas, Bradyrhizobium, Staphylococcus, and Microbacterium, could pose potential health risks to hemodialysis patients.", "https://www.researchgate.net/publication/382559089_Potentially_pathogenic_culturable_bacteria_in_hemodialysis_waters");
 
 stmt.run("Daniel Jinnefält", "", "Inequality of Clean Water in Africa", "This chapter explores the disparities in access to clean water in Africa, examining the impacts of climate change, poor governance, population growth, and urbanization. It highlights how these factors increase water demand and contribute to gender biases, impacting women's and children's access to education and income opportunities. The chapter critiques traditional solutions like desalination and borehole drilling, which can worsen inequalities and harm the environment. Instead, it promotes water harvesting and conservation technologies as sustainable and locally viable alternatives. Effective management of Africa's precipitation can mitigate water scarcity issues and benefit various sectors.","https://www.researchgate.net/publication/382167202_Inequality_of_Clean_Water_in_Africa");

  stmt.run("Wati Asriningsih Pranoto", "", "Analysis of the Need and Availability of Clean Water in The Karo Regency Area", "This study examines the future demand for clean water in Karo Regency amid population growth. It analyzes data from the PDAM Tirta Malem unit, focusing on population trends, customer numbers, and water needs. Projections indicate a significant increase in demand, reaching 212,644.7 liters per second by 2033. Fortunately, current water sources are expected to meet this future need, with existing springs providing 373 liters per second. Thus, Karo Regency is projected to have adequate clean water supplies by 2033."," https://www.researchgate.net/publication/383487425_Analysis_of_The_Need_and_Availability_of_Clean_Water_in_The_Karo_Regency_Area");

  stmt.run("Poornima Jayaraman", "", "Critical Review on Water Quality Analysis Using IoT and Machine Learning Models", "This article provides a comprehensive review of sensors and IoT technologies used for water quality management. It emphasizes the improved accuracy of IoT systems (95%) in measuring parameters such as pH, turbidity, TDS, and temperature compared to traditional methods (85%). The study also explores how AI techniques, including machine learning and deep learning, enhance groundwater quality assessments. Additionally, the paper discusses the role of GIS in spatial data analysis and the future of sensors and geospatial technology in water quality monitoring.","https://www.sciencedirect.com/science/article/pii/S2667096823000563");

  stmt.run("Abdul Onoruoiza Momoh", "Elizade University", "International Journal of Water Research", "Physicochemical and Microbiological Assessment of Surface Water in Ikota", "A microbiological assessment of surface water in Ikota, Ondo State, Nigeria, was conducted using standard procedures. The pH, conductivity, and hardness of the water were found to be within WHO limits. However, the water was contaminated with microorganisms such as Escherichia coli, Klebsiella sp., Enterobacter sp., and Staphylococcus sp., as well as parasites including Giardia sp., Cryptosporidium sp., and Schistosomiasis, and fungi like Aspergillus sp. Given the presence of these contaminants, it is recommended that the water be treated with chlorine before use for public health purposes.","https://www.researchgate.net/publication/383536020_International_Journal_of_Water_Research_Physicochemical_and_Microbiological_Assessment_of_Surface_Water_in_Ikota");

  stmt.run("Christina Olly Lada", "", "Does the Nutritional Status of Stunted Toddlers have a Correlation with their Dietary Diversity and Clean Water Sources?", "Most toddlers in Indonesia, including those in East Nusa Tenggara Province, suffer from a lack of dietary diversity and consume water from unimproved sources, which can contribute to stunting and long-term health issues. This study analyzed the correlation between dietary diversity, clean water sources, and the nutritional status of stunted toddlers in Kupang Regency using secondary data from the Indonesian Community Care Network Foundation. The study examined 70 cases of stunted toddlers aged 12-59 months and found a significant positive correlation between dietary diversity, clean water sources, and the nutritional status of these toddlers (p < 0.001). This underscores the importance of a varied diet and access to clean water in preventing stunting. ","https://www.researchgate.net/publication/377568443_Does_the_Nutritional_Status_of_Stunted_Toddlers_have_a_Correlation_with_their_Dietary_Diversity_and_Clean_Water_Sources");

  stmt.run("Galal M. Binmakhashen", "", "From data to clean water: XGBoost and Bayesian optimization for advanced wastewater treatment with ultrafiltration", "Water pollution poses a severe global threat to human health and ecosystems. Ultrafiltration is crucial for removing contaminants and ensuring clean water. This study presents a novel hybrid machine learning approach that enhances ultrafiltration processes for more effective contaminant removal. By integrating eXtreme Gradient Boosting (XGBoost) with Bayesian optimization, we developed highly accurate predictive models (R² > 99%) for post-treatment levels of metal ions, organic pollutants, and salts. This method allows precise control of the ultrafiltration process through four key variables: metal ion concentration, organic pollutants, salts, and applied pressure. The findings highlight the potential of this approach to revolutionize wastewater treatment, leading to cleaner water and advancing environmental technology.","https://www.researchgate.net/publication/382795972_From_data_to_clean_water_XGBoost_and_Bayesian_optimization_for_advanced_wastewater_treatment_with_ultrafiltration");

  stmt.run("Mostafa Essam Eissa", "Independent Researcher", "Enhancing microbiological stability in municipal water distribution: A descriptive statistical analysis for public health assurance", "Ensuring the microbiological quality of municipal water is vital for public health and a key concern for authorities. This study evaluates the microbial stability of a city's water distribution system over a year, focusing on variations in microbial counts across different points of use. The highest bioburden was observed in autumn, with some locations exceeding the 10,000 CFU/100 mL threshold, indicating potential issues related to distance, pipe type, or biofilms. An early warning system was established to monitor these surges. The study found that some sections of the distribution system showed less variation in microbial levels, while significant differences were observed between high and low microbial count areas. This suggests the need to review the distribution infrastructure design to ensure water safety. The findings provide valuable insights for public health management, helping authorities identify and address areas at risk for waterborne diseases.","https://www.researchgate.net/publication/381803923_Enhancing_microbiological_stability_in_municipal_water_distribution_A_descriptive_statistical_analysis_for_public_health_assurance");
  stmt.finalize();

  db.run("CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY, post_id INTEGER, comment TEXT, FOREIGN KEY(post_id) REFERENCES posts(id))");
});

// Middleware to serve static files
// app.use(express.static('public'))

// API to get posts
app.get('/api/posts', (req, res) => {
    console.log("Received request to /api/posts");
    
    db.all("SELECT * FROM posts", [], (err, rows) => {
      if (err) {
        console.error("Error fetching posts: ", err);
        throw err;
      }
  
    //  console.log("Fetched posts: ", rows);
      res.json(rows);
    });
  });
  

// Get all comments for a post
app.get('/api/comments/:postId', (req, res) => {
  const { postId } = req.params;
  db.all('SELECT * FROM comments WHERE post_id = ?', [postId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Add a new comment
app.post('/api/comments', (req, res) => {
  const { post_id, comment } = req.body;
  db.run('INSERT INTO comments (post_id, comment) VALUES (?, ?)', [post_id, comment], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID });
  });
});

// Delete a comment
app.delete('/api/comments/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM comments WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(204).end();
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});