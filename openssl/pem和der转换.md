- pem转der

```bash
$ openssl x509 -inform PEM -in fd.pem -outform DER -out fd.der
```

- der转pem

```bash
$ openssl x509 -inform DER -in fd.der -outform PEM -out fd.pem
```

