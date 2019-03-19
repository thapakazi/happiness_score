serve:
	go run api/*.go

add:
	go run cmd/main.go -a

boot_pg:
	cd api && docker-compose up
