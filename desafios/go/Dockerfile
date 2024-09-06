FROM golang:1.23-alpine AS builder

WORKDIR /app
COPY ./hello.go ./hello.go
COPY ./go.mod ./go.mod

RUN go build -ldflags "-w"

FROM scratch

COPY --from=builder /app /

ENTRYPOINT ["/hello"]