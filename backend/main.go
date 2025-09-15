package main

import (
	"log"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// ----- MODELS -----
type Defect struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Title     string    `json:"title"`
	Message   string    `json:"message"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type LogEntry struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Action    string    `json:"action"`
	DefectID  uint      `json:"defect_id"`
	Timestamp time.Time `json:"timestamp"`
}

// ----- GLOBAL DB -----
var db *gorm.DB

func main() {
	var err error

	// SQLite (просто для старта)
	db, err = gorm.Open(sqlite.Open("defects.db"), &gorm.Config{})

	if err != nil {
		log.Fatal("failed to connect database:", err)
	}

	// Миграции
	db.AutoMigrate(&Defect{}, &LogEntry{})

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"}, // адрес твоего фронтенда (Vue dev server)
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// CRUD endpoints
	r.POST("/defects", createDefect)
	r.GET("/defects", getDefects)
	r.GET("/defects/:id", getDefect)
	r.PUT("/defects/:id", updateDefect)
	r.DELETE("/defects/:id", deleteDefect)

	r.Run(":8080")
}

// ----- HANDLERS -----

func createDefect(c *gin.Context) {
	var defect Defect
	if err := c.ShouldBindJSON(&defect); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db.Create(&defect)
	logAction("CREATE", defect.ID)
	c.JSON(http.StatusCreated, defect)
}

func getDefects(c *gin.Context) {
	var defects []Defect
	db.Find(&defects)
	c.JSON(http.StatusOK, defects)
}

func getDefect(c *gin.Context) {
	var defect Defect
	if err := db.First(&defect, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Defect not found"})
		return
	}
	c.JSON(http.StatusOK, defect)
}

func updateDefect(c *gin.Context) {
	var defect Defect
	if err := db.First(&defect, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Defect not found"})
		return
	}
	if err := c.ShouldBindJSON(&defect); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db.Save(&defect)
	logAction("UPDATE", defect.ID)
	c.JSON(http.StatusOK, defect)
}

func deleteDefect(c *gin.Context) {
	var defect Defect
	if err := db.First(&defect, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Defect not found"})
		return
	}
	db.Delete(&defect)
	logAction("DELETE", defect.ID)
	c.JSON(http.StatusOK, gin.H{"message": "Defect deleted"})
}

// ----- LOGGING -----
func logAction(action string, defectID uint) {
	entry := LogEntry{
		Action:    action,
		DefectID:  defectID,
		Timestamp: time.Now(),
	}
	db.Create(&entry)
}
