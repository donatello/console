// Code generated by go-swagger; DO NOT EDIT.

// This file is part of MinIO Console Server
// Copyright (c) 2022 MinIO, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//

package bucket

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"github.com/minio/console/models"
)

// GetBucketObjectLockingStatusOKCode is the HTTP code returned for type GetBucketObjectLockingStatusOK
const GetBucketObjectLockingStatusOKCode int = 200

/*
GetBucketObjectLockingStatusOK A successful response.

swagger:response getBucketObjectLockingStatusOK
*/
type GetBucketObjectLockingStatusOK struct {

	/*
	  In: Body
	*/
	Payload *models.BucketObLockingResponse `json:"body,omitempty"`
}

// NewGetBucketObjectLockingStatusOK creates GetBucketObjectLockingStatusOK with default headers values
func NewGetBucketObjectLockingStatusOK() *GetBucketObjectLockingStatusOK {

	return &GetBucketObjectLockingStatusOK{}
}

// WithPayload adds the payload to the get bucket object locking status o k response
func (o *GetBucketObjectLockingStatusOK) WithPayload(payload *models.BucketObLockingResponse) *GetBucketObjectLockingStatusOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get bucket object locking status o k response
func (o *GetBucketObjectLockingStatusOK) SetPayload(payload *models.BucketObLockingResponse) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetBucketObjectLockingStatusOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

/*
GetBucketObjectLockingStatusDefault Generic error response.

swagger:response getBucketObjectLockingStatusDefault
*/
type GetBucketObjectLockingStatusDefault struct {
	_statusCode int

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewGetBucketObjectLockingStatusDefault creates GetBucketObjectLockingStatusDefault with default headers values
func NewGetBucketObjectLockingStatusDefault(code int) *GetBucketObjectLockingStatusDefault {
	if code <= 0 {
		code = 500
	}

	return &GetBucketObjectLockingStatusDefault{
		_statusCode: code,
	}
}

// WithStatusCode adds the status to the get bucket object locking status default response
func (o *GetBucketObjectLockingStatusDefault) WithStatusCode(code int) *GetBucketObjectLockingStatusDefault {
	o._statusCode = code
	return o
}

// SetStatusCode sets the status to the get bucket object locking status default response
func (o *GetBucketObjectLockingStatusDefault) SetStatusCode(code int) {
	o._statusCode = code
}

// WithPayload adds the payload to the get bucket object locking status default response
func (o *GetBucketObjectLockingStatusDefault) WithPayload(payload *models.Error) *GetBucketObjectLockingStatusDefault {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get bucket object locking status default response
func (o *GetBucketObjectLockingStatusDefault) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetBucketObjectLockingStatusDefault) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(o._statusCode)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
