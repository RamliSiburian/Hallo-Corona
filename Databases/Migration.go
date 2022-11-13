package Databases

import (
	"fmt"
	"halloCorona/Models"
	"halloCorona/Pkg/Mysql"
)

func Migration() {
	err := Mysql.DB.AutoMigrate(&Models.User{}, &Models.Article{}, &Models.Consultation{})

	if err != nil {
		panic("Migration failed")
	}

	fmt.Println("Migration success")
}
