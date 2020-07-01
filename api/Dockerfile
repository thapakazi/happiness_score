FROM golang:alpine AS builder

WORKDIR /builder
RUN apk add --no-cache gcc libc-dev
COPY . .
RUN go get -v
RUN GOOS=linux go build -o app

FROM alpine
COPY --from=builder /builder/app .
CMD [ "/app" ]
