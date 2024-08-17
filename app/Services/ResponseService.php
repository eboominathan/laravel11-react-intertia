<?php
namespace App\Services;

use Illuminate\Http\JsonResponse;

class ResponseService{
    /**
     * HTTP Status Code Constants
     */
    const HTTP_OK = 200;
    const HTTP_CREATED = 201;
    const HTTP_NO_CONTENT = 204;
    const HTTP_BAD_REQUEST = 400;
    const HTTP_UNAUTHORIZED = 401;
    const HTTP_FORBIDDEN = 403;
    const HTTP_NOT_FOUND = 404;
    const HTTP_INTERNAL_SERVER_ERROR = 500;

    /**
     * Generate a success response.
     *
     * @param mixed $data
     * @param int $statusCode
     * @return JsonResponse
     */
    public function success($data, int $statusCode = self::HTTP_OK): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $data,
        ], $statusCode);
    }

    /**
     * Generate a failure response.
     *
     * @param string $message
     * @param int $statusCode
     * @return JsonResponse
     */public function failure(string $message, int $statusCode = self::HTTP_BAD_REQUEST): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
        ], $statusCode);
    }
}
