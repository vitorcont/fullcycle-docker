FROM golang:1.23-alpine AS builder

WORKDIR /usr/src/app
COPY ./hello.go ./hello.go
COPY ./go.mod ./go.mod

RUN go build

FROM scratch

COPY --from=builder /usr/src/app/hello /hello

ENTRYPOINT ["/hello"]